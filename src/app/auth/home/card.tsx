import Icon from "@/components/ui/icon";
import useThemeCustom from "@/hooks/useThemeCustom";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

interface CardHomeProps {
  data: number | string;
  title: string;
  icon?: string;
  color?: string;
}

function CardHome({ data, title, icon, color }: CardHomeProps) {
  const { customTheme } = useThemeCustom();
  return (
    <Card sx={{ boxShadow: 4 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h5">{data}</Typography>
            <Typography variant="caption">{title}</Typography>
          </Box>
          {icon && (
            <Icon color={color ?? customTheme?.palette.primary.main} size={36}>
              {icon}
            </Icon>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CardHome;
