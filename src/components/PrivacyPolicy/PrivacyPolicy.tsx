import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {wp} from '../../config/appConfig.ts';
import CustomButton from '../CustomButton/CustomButton.tsx';
import {privacyPolicyStyles} from './privacyPolicyStyles.ts';

const PrivacyPolicy = () => {
  return (
    <View style={privacyPolicyStyles.container}>
      <ScrollView contentContainerStyle={privacyPolicyStyles.scrollViewContent}>
        <View style={privacyPolicyStyles.content}>
          <Text style={privacyPolicyStyles.header}>
            Welcome to Shopease! We are committed to protecting your privacy.
          </Text>
          <Text style={privacyPolicyStyles.text}>
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

      <View style={privacyPolicyStyles.buttonCon}>
        <CustomButton
          title="ACCEPT"
          width={wp('42%')}
          testID="agree-button"
          onPress={() => {}}
        />

        <TouchableOpacity style={privacyPolicyStyles.button}>
          <Text style={privacyPolicyStyles.buttonText}>DECLINE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrivacyPolicy;
