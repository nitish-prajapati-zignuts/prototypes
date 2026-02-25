import { FontWeight,FontSize } from "@/constants/typography";
import { Text, TextProps } from "react-native";


interface Props extends TextProps {
  size?: keyof typeof FontSize;
  weight?: keyof typeof FontWeight;
}

export default function AppText({
  size = "md",
  weight = "regular",
  style,
  ...props
}: Props) {
  return (
    <Text
      {...props}
      style={[
        {
          fontSize: FontSize[size],
          fontWeight: FontWeight[weight],
          color: "#222",
        },
        style,
      ]}
    />
  );
}