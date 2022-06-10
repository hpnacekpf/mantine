import { Box, Button, Group, Stack, Text } from "@mantine/core";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: any[];
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <Box mb="md">
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Stack spacing={0}>
          <Text weight={500} size="lg">
            {title}
          </Text>
          <Text color="dimmed" size="sm">
            {subtitle}
          </Text>
        </Stack>
        <Group spacing={5} style={{ marginLeft: "auto" }}>
          {actions}
        </Group>
      </div>
    </Box>
  );
}
