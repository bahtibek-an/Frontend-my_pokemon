import { Box } from "../Box";
import { Text } from "../Text";
import { BadgeProps } from "./types";

export default function Badge({
  title,
  bg = "interactive-1",
  color = "text-4",
}: BadgeProps) {
  return (
    <Box
      as="span"
      sx={{
        mr: 500,
        mb: 500,
        p: 300,
        backgroundColor: bg,
        borderRadius: "8px",
      }}
    >
      <Text sx={{ color }}>{title}</Text>
    </Box>
  );
}
