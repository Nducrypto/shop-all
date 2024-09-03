import {StyleSheet, Text, ScrollView} from 'react-native';
import React from 'react';
import {userAgreementStyles} from './userAgreementStyles';

const UserAgreement = () => {
  return (
    <ScrollView contentContainerStyle={userAgreementStyles.container}>
      <Text style={userAgreementStyles.title}>
        Welcome to Shopease! These Terms of Service govern your use of our
        mobile application. By accessing or using our Service, you agree to
        comply with and be bound by these Terms. If you do not agree to these
        Terms, please do not use our Service. To use our Service
      </Text>
      <Text style={userAgreementStyles.text}>
        You must be at least 18 years old or have the consent of a parent or
        guardian. By using our Service, you confirm that you meet these
        requirements and agree to use the Service only for lawful purposes and
        in accordance with these Terms. You agree not to engage in any activity
        that is illegal, fraudulent, or harmful to others. You are responsible
        for providing accurate, complete, and current information during
        registration and for keeping your account credentials confidential. You
        must notify us immediately if you suspect any unauthorized use of your
        account. When you make a purchase through our Service, you agree to
        provide accurate payment information and authorize us to process the
        payment. We reserve the right to refuse or cancel any order at our
        discretion. You are responsible for any content you post or transmit
        through our Service, including text, images, and reviews. By submitting
        content, you grant us a non-exclusive, royalty-free, perpetual, and
        worldwide license to use, reproduce, modify, and distribute your content
        for operating and promoting our Service. You agree not to post or
        transmit content that is defamatory, obscene, or otherwise
        inappropriate. All intellectual property rights in the Service,
        including trademarks, copyrights, and patents, are owned by or licensed
        to us. You may not use, reproduce, or distribute any content from the
        Service without our prior written consent. We do not endorse or assume
        responsibility for any third-party sites or services. Use of third-party
        sites is at your own risk. We reserve the right to suspend or terminate
        your access to our Service at any time, with or without cause, and with
        or without notice. We do not guarantee that the Service will be
        uninterrupted or error-free. To the fullest extent permitted by law, we
        disclaim all liability for any indirect, incidental, special, or
        consequential damages arising from your use of the Service, including
        loss of data or business opportunities. You agree to indemnify and hold
        us harmless from any claims, liabilities, damages, losses, or expenses
        arising out of your use of the Service, your content, or your violation
        of these Terms. We may update these Terms from time to time. We will
        notify you of any changes by posting the new Terms on our Service with
        an updated effective date. Your continued use of the Service after any
        changes constitutes your acceptance of the revised Terms.
      </Text>
    </ScrollView>
  );
};

export default UserAgreement;

const styles = StyleSheet.create({});
