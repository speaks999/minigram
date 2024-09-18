"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  supabase,
  insertFileUpload,
  FileUploadData,
  TaskData,
  getTeamMembers,
} from "@/lib/supabaseClient";
import { UserDropdown } from "@/components/UserDropdown";

const STORAGE_BUCKET_NAME = "task-files";

type AddTaskFormProps = {
  teamId: string;
  onTaskAdded: () => void;
};

interface TeamMember {
  id: string;
  user_id: string;
  users: {
    id: string;
    email: string;
  };
}

export default function AddTaskForm({ teamId, onTaskAdded }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUserId, setAssignedUserId] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const members = await getTeamMembers(teamId);
        setTeamMembers(members as unknown as TeamMember[]);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, [teamId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newTaskData: TaskData = {
        title,
        description,
        team_id: teamId,
        due_date: dueDate || null,
        assigned_user_id: assignedUserId,
      };

      // Insert task
      const { data: insertedTask, error: taskError } = await supabase
        .from("tasks")
        .insert(newTaskData)
        .select()
        .single();

      if (taskError) throw taskError;

      // Upload files
      for (const file of files) {
        const filePath = `${teamId}/${insertedTask.id}/${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET_NAME)
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Insert file record
        const fileUploadData: FileUploadData = {
          task_id: insertedTask.id,
          user_id: user.id,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
        };

        await insertFileUpload(fileUploadData);
      }

      setTitle("");
      setDescription("");
      setDueDate("");
      setAssignedUserId(null);
      setFiles([]);
      onTaskAdded();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={addTask} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="w-full p-2 border rounded"
        rows={3}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <UserDropdown
        users={teamMembers.map((m) => m.users)}
        value={assignedUserId}
        onChange={setAssignedUserId}
      />
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Add Task
      </button>
    </form>
  );
}
