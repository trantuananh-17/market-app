import colors from "@utils/colors";
import { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";

interface Props {
  imageUrl: ImageSourcePropType;
  heading: string;
  subHeading: string;
}

// const heading = "Online Marketplace for Used Goods";
// const subHeading =
//   "Buy or sell used goods with trust. Chat derectly with sellers, ensuring a seamless, authentic experience";

// const heading = "Your Online Spot to Buy & Sell.";
// const subHeading =
//   "Instantly connect with real people to trade secondhand goods safely and easily.";

const WelcomeHeader: FC<Props> = ({ imageUrl, heading, subHeading }) => {
  return (
    <View style={styles.container}>
      <Image
        source={imageUrl}
        style={styles.image}
        resizeMode="contain"
        resizeMethod="resize"
      />
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.subHeading}>{subHeading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
  heading: {
    fontWeight: 600,
    fontSize: 25,
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 5,
    color: colors.textPrimary,
  },
  subHeading: {
    fontSize: 12,
    textAlign: "center",
    marginHorizontal: 20,
    lineHeight: 14,
    color: colors.textSecondary,
  },
});

export default WelcomeHeader;
