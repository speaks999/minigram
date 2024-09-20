// deno-lint-ignore-file no-unused-vars
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "npm:@react-email/components@0.0.22";
import * as React from "npm:react@18.3.1";

interface TaskInsertEmailProps {
  taskId: string;
  taskName: string;
  taskDescription: string;
  taskDueDate: string;
}

export const TaskInsertEmail = ({
  taskName,
  taskDescription,
  taskDueDate,
}: TaskInsertEmailProps) => (
  <Html>
    <Head />
    <Preview>A task has been assigned to you!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>A task has been assigned to you!</Heading>
        <Heading style={h2}>Task Name: {taskName}</Heading>
        <Text>Task Description: {taskDescription}</Text>
        <Text>Task Due Date: {taskDueDate}</Text>
        <Text>
          We've added a new task to your list. Please review the details above
          and take action as needed.
        </Text>
        <Text>
          Remember to update the task status as you make progress. If you have
          any questions or need clarification, don't hesitate to reach out to
          the task creator or your team lead.
        </Text>
        <Link
          href="https://minigram-supabase-git-master-toddwstorm-gmailcoms-projects.vercel.app/tasks"
          target="_blank"
          style={{
            ...link,
            display: "block",
            marginBottom: "16px",
          }}
        >
          View and manage your tasks in Minigram
        </Link>
        <Text>
          Thank you for your dedication to keeping our projects on track!
        </Text>

        <Text style={footer}>
          <Link
            href="https://minigram-supabase-git-master-toddwstorm-gmailcoms-projects.vercel.app/"
            target="_blank"
            style={{ ...link, color: "#898989" }}
          >
            Minigram Corp
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default TaskInsertEmail;

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const h2 = {
  color: "blue",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};
