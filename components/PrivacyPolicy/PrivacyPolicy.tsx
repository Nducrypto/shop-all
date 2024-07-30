import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {width} from '../../constants/utils';
import CustomButton from '../../components/CustomButton/CustomButton';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <Text style={styles.header}>
            Welcome to Shopease! We are committed to protecting your privacy.
          </Text>
          <Text style={styles.text}>
            This Privacy Policy outlines how we collects, uses, discloses, and
            safeguards your information when you use our Services. By accessing
            or using our Service, you agree to the collection and use of
            information in accordance with this policy. When you register for an
            account, make a purchase, or otherwise interact with our Service, we
            collect personal information that you provide to us, including your
            name, email address, phone number, shipping and billing addresses,
            and payment information. Additionally, as you use our Service, we
            gather data about how it is accessed and used, such as your device's
            IP address, browser type and version, pages you visit, the time and
            date of your visits, and other diagnostic data. To enhance your
            experience, we employ cookies and similar tracking technologies that
            store small amounts of data on your device. Cookies allow us to
            remember your preferences, track user activity, and improve our
            Service. We use the collected information to operate and maintain
            our Service, communicate with you about changes, provide customer
            support, and process transactions. This includes using your data to
            personalize your experience, and analyze how users interact with our
            Service to improve its functionality. Your personal information may
            be shared with third-party service providers who assist us in
            operating our Service, such as payment processors, shipping
            companies, and marketing partners. These third parties are obligated
            to protect your information and are prohibited from using it for any
            purpose other than providing their services to us. We take
            reasonable measures to safeguard your personal information from
            unauthorized access, use, or disclosure. You have the right to
            access, update, or delete your personal information. By using our
            Service, you consent to the collection and use of your information
            as described in this Privacy Policy. We may update this policy from
            time to time, and any changes will be posted on this page with an
            updated effective date. We encourage you to review this Privacy
            Policy periodically for any changes.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonCon}>
        <CustomButton
          title="ACCEPT"
          width={width / 2.2}
          testID="agree-button"
          onPress={() => {}}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>DECLINE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    marginTop: 20,
    paddingBottom: 100,
  },
  content: {
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
  },
  text: {
    fontSize: 14,
    color: 'black',
    marginTop: 16,
  },
  buttonCon: {
    flexDirection: 'row',
    width,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    padding: 15,
    width: width / 2.2,
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
  buttonText: {
    textAlign: 'center',
    color: 'lightgrey',
    fontSize: 16,
  },
});
