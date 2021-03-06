'use strict';

const en = {
  header: {
    brand: 'Dashboard',
    home: 'Home',
    insurance: 'Market',
    market: 'Products',
    analytics: 'Analytics',
    whitePaper: 'White Paper',
    faq: 'FAQ',
    login: 'Login',
    signUp: 'Sign Up',
    admin: 'Admin',
    user: 'Personal Center',
    logout: 'Logout',
    lang: 'English'
  },
  home: {
    slot1: {
      title: ['Dashboard', 'Data Analysis', 'Privacy Protection'],
      content: [
        'Innovative insurance data service platform based on blockchain technology',
        'Data analysis based on AI',
        'Data security and privacy protection'
      ]
    },
    slot2: {
      header: 'Product Advantages',
      title: ['Upload the data onto the Ethereum blockchain', 'Big Data Analysis', 'Privacy Security', 'Industry Credit'],
      content: [
        'Upload the insurance data onto the Ethereum blockchain. The information which built on blockchain is authentic, reliable, traceable, and the digital identity cannot be tampered with, removed, edited or forged.',
        'Combined with artificial intelligence for customizing accurate risk control schemes for the insurance industry, pricing models, personalized policies and new types of insurance and so on to provides big data support.',
        'The account digital identity information is highly encrypted, and the information is protected for privacy before the authorization of the provider, the data security and personal privacy will be guaranteed.',
        'Establish the integral investigation system through block chain technology. The information shall not be tampered with or falsified to provide authentic and reliable data sources for integral investigation institutions.'
      ]
    },
    slot3: {
      title: 'Product introduction',
      content: 'Dashboard is an innovative insurance platform based on blockchain technology. Upload logistics record of the users and insurance certificate information onto the Ethereum blockchain system. User information is protected without the authorization of the provider. The platform combines with artificial intelligence to conduct customized analysis of big data on the blockchain.'
    },
    slot4: {
      header: 'Product Feature',
      title: ['', '', '', ''],
      content: [
        'Ordinary users can browse the insurance products of various insurance companies through the platform, and to find suitable insurance products through big data analysis.',
        'Provides data services based on privacy protection for paying users or premium members.(Data can be used to design new types of insurance, customized policies, precision marketing, etc).',
        'The platform provides independent function module APIs for third parties, and provides charging services such as interface docking for system customization development and system integration.',
        'The intermediate cost is reduced by resource sharing. Value can be allocated to each node according to its contribution to the blockchain network,and other nodes can be encouraged to participate actively.'
      ]
    },
    slot5: {
      header: 'Contact us'
    }
  },
  login: {
    title: 'LOGIN',
    account: 'Phone Number/Email',
    password: 'Password',
    submit: 'Login',
    dialog: {
      title: 'Google Authenticator',
      placeholder: 'Please enter the 6-digit Google code',
      buttonText: 'Confirm'
    }
  },
  signUp: {
    phoneTitle: 'Phone',
    emailTitle: 'Email',
    phonePlaceholder: 'Phone Number',
    emailPlaceholder: 'Email',
    getCode: 'Get Code',
    retrieveCode: 'Retrieve Code',
    code: '6-bit Verification Code',
    password: 'Password',
    password2: 'Password again',
    submit: 'Sign Up'
  },
  market: {
    operation: {
      title: ['Select Company', 'Search for products']
    },
    pingan: {
      category: 'Category: ',
      period: 'Period: ',
      input: 'Submit My Policy'
    },
    picc: {
      category: 'Category: ',
      age: 'Age',
      period: 'Period: ',
      input: 'Submit My Policy'
    },
    dialog: {
      title: 'My Policy',
      product: {
        title: 'Product Information',
        company: 'Company',
        category: 'Category',
        name: 'Name'
      },
      user: {
        title: 'Personal Information',
        holder: 'Holder',
        insurant: 'Insurant',
        credentials: 'Credentials',
        age: 'Age',
        sex: {
          title: 'Sex',
          content: ['Male', 'Female']
        },
        status: {
          title: 'Status',
          content: ['Unmarried', 'Married']
        },
        address: 'Address',
        contact: 'Contact'
      },
      policy: {
        title: 'Policy Information',
        amount: 'Amount',
        renewal: 'Eenewal',
        startTime: {
          title: 'Start Time',
          placeholder: 'Please select the date'
        },
        period: 'Period',
        description: 'Description'
      }
    }
  },
  user: {
    aside: {
      slot: [
        {
          title: 'Profile',
          item: ['Account Safety', 'My Policies']
        },
        {
          title: 'Support',
          item: ['Submit a ticket', 'My Tickets']
        }
      ]
    },
    // DONE
    detail: {
      account: {
        title: 'Account Info',
        tip: {
          title: 'Security Tip',
          description: 'For the safety of your account, please check carefully the domain you are visiting, enable two factor authentication, and do NOT disclose your verification codes to anyone including Dashboard staff.'
        },
        info: {
          title: ['Account', 'Last Login At']
        }
      },
      security: {
        title: 'Security Setting',
        google: {
          title: 'Google Authenticator',
          description: 'Receive verification codes for login.',
          operation: {
            reset: 'Reset',
            open: 'ON'
          }
        }
      },
      dialog: {
        title: 'Google Authenticator',
        placeholder: 'Please enter the 6-digit Google code',
        buttonText: 'Confirm'
      }
    },
    // DONE
    google: {
      title: ['Install Google Auth', 'Reset Google Auth'],
      step: [
        {
          text: 'After installation, open Google authenticator and scan the below or enter the key to get a 6-digit code.',
          tip: {
            title: 'Security Tip',
            description: 'Please keep your private key secure to avoid login problem if you change or lose your phone.'
          },
          qr: 'Key'
        },
        {
          text: 'Please enter the 6-digit code and SMS code to complete the settings.',
          form: {
            label: 'New Google authenticator code',
            placeholder: 'Please input Google auth code',
            buttonText: 'Comfirm'
          }
        }
      ]
    },
    policy: {
      // the content follow same as market.dialog
    }
  },
  notFound: {
    content: 'The page you visited does not exist!',
    back: 'Back to home page!'
  },
  company: {
  },
  message: {
    info: {},
    warning: {
      reLogin: 'User do not login, please login at first!',
      jwtExpires: 'JWT expires, please re-login!',
      jwtMalformed: 'JWT malformed, please re-login!',
      invalidToken: 'JWT invalid, please re-login!',
      googleAuthNone: 'Please set Google authenticator at first!',
      googleAuthSetted: 'Google authenticator has been setted!',
    },
    error: {},
  },
  component: {
    button: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      save: 'Save'
    },
    alert: {
      errorTitle: 'Error',
      warningTitle: 'Warning'
    },
    loading: {
      login: 'User is logging in...',
      signUp: 'User is signing up...',
      insurance: 'Getting insurance products...',
      analytics: 'Analyzing data........',

      myInsuranceSaving: 'Saving my insurance......'
    }
  }
};
export default en;
