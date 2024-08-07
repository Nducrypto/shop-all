import {StyleSheet, Text, ScrollView} from 'react-native';
import React from 'react';

const About = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}>
      <Text style={styles.text}>
        At Shopease, we are dedicated to transforming your shopping experience.
        Founded with the vision of making online shopping seamless and
        enjoyable, our mission is to provide you with an extensive range of
        high-quality products at your fingertips, coupled with exceptional
        customer service. Our journey began with a simple idea: to create an
        e-commerce platform that offers not only a diverse selection of products
        but also a user-friendly and reliable shopping experience. From the
        latest fashion trends and cutting-edge electronics to home essentials
        and unique gifts, Shopease aims to be your go-to destination for all
        your shopping needs. We understand that convenience is key in today’s
        fast-paced world, which is why we have designed our platform to be
        intuitive and easy to navigate. Our commitment to delivering a smooth
        shopping experience extends from the moment you browse our catalog to
        the timely delivery of your orders. Customer satisfaction is at the
        heart of everything we do. Our team is passionate about ensuring that
        each interaction with Shopease exceeds your expectations. We are always
        here to assist you with any questions or concerns you may have, and we
        continuously strive to improve our services based on your feedback. At
        Shopease, we also prioritize the security of your personal information.
        We employ advanced technology and best practices to safeguard your data
        and provide a safe shopping environment. Your privacy and trust are
        important to us, and we are dedicated to protecting them with the utmost
        care. Thank you for choosing Shopease as your preferred online shopping
        destination. We look forward to serving you and making your shopping
        experience exceptional. If you have any questions, feedback, or need
        assistance, please do not hesitate to reach out to us.
      </Text>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
});
