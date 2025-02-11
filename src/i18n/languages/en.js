const language = {
  common: {
    next: 'Next',
    back: 'Back',
    restart: 'Restart',
    submit: 'Submit',
    close: 'Close',
    terms: {
      agree: 'I Agree to the',
      termsAndConditions: 'Terms & Conditions',
    }
  },
  page: {
    additionalInfo: {
      label: 'Additional Info',
    },
    confirmation: {
      label: 'Confirmation',
    },
    signUp: {
      label: 'Sign Up',
    },
    signUpResult: {
      success: {
        label: 'Success!',
        message: 'You should receive a confirmation email soon.',
      },
      error: {
        label: 'Error!',
        message: 'Uh oh, something went wrong. Please try again later.',
      }
    }
  },
  form: {
    name: {
      label: 'First Name',
      errors: (size) => ({
        'required_error': 'A name is Required',
        'too_small': `A name must have at least ${size} character(s)`
      }),
    },
    email: {
      label: 'Email',
      errors: {
        'invalid_type_error': 'The email is incorrectly formated',
        'required_error': 'A valid email is Required e.g. hello@test.com',
        'invalid_string': 'A valid email is Required e.g. hello@test.com',
      },
    },
    password: {
      label: 'Password',
      errors: (size) => ({
        'required_error': 'A password is Required',
        'too_small': `A password must have at least ${size} character(s)`
      }),
    },
    color: {
      label: 'Favorite Color',
      errors: {
        'required_error': 'A color is Required',
        'failed_async': 'Failed to load colors'
      },
    },
    terms: {
      label: 'Terms & Conditions',
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl dolor, fringilla eget neque quis, imperdiet lobortis tellus. Pellentesque eu feugiat ipsum, eu pharetra nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam eu pretium dolor. Proin congue ligula id elit ultrices consectetur. Suspendisse laoreet dictum justo vitae efficitur. Proin sed mollis risus, eget vestibulum purus. Nulla ultrices porttitor lorem non posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed et faucibus ante. Nulla ut luctus ligula, dignissim posuere magna. In a sodales ligula, eleifend fringilla nisl. Ut at condimentum ante, sed vehicula velit. Sed vitae mattis enim. Nullam semper massa ut lacus euismod consectetur vel eget mi. Nulla vel luctus arcu.\n\nPellentesque sed massa orci. Maecenas ac leo nulla. Donec placerat faucibus nunc, sed aliquam dolor tincidunt eget. Aliquam ornare vulputate justo, interdum vestibulum dui tristique in. Cras sed orci pulvinar, consequat lectus nec, rutrum felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum magna sed aliquam pharetra. Suspendisse id enim non dui cursus dapibus nec imperdiet lacus. Aliquam aliquam dui nibh, ut pulvinar velit auctor non. Maecenas ut magna a ipsum venenatis egestas. Nulla rhoncus semper elementum. Vivamus non maximus enim. Duis viverra eleifend lorem sagittis sagittis. Nulla faucibus blandit lectus, vitae commodo massa dignissim eu. Praesent eu congue nunc.\n\nNulla in ipsum volutpat ex sagittis faucibus. Integer non ullamcorper mauris. Donec dictum, turpis a elementum sodales, tortor nisi auctor arcu, ac accumsan erat magna id neque. Aliquam mattis dictum massa, a ornare purus. Cras quis porttitor magna. In feugiat est nibh, nec fermentum ante sodales non. Cras condimentum venenatis ipsum, viverra imperdiet augue eleifend ac. Donec feugiat tempor tortor eu venenatis.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam non lacinia lorem. In nec turpis erat. Duis consectetur congue eros et euismod. Mauris venenatis tortor a orci luctus aliquam. Sed maximus sollicitudin mattis. Morbi id dignissim dui, quis elementum leo.\n\nAenean nibh ipsum, dapibus auctor hendrerit quis, posuere quis quam. In condimentum tincidunt ex, vehicula consequat mauris vestibulum eget. Pellentesque vulputate magna nec erat cursus, in blandit lorem accumsan. Aenean auctor urna vel risus varius pellentesque. In hac habitasse platea dictumst. Suspendisse varius sit amet arcu dictum vulputate. Proin congue ex nulla, in mollis neque imperdiet in. Quisque ut ipsum semper, vestibulum ante vel, feugiat est. Mauris porttitor sagittis augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam aliquam ultrices dolor nec ornare. Etiam pellentesque ac nibh nec aliquet. Suspendisse mollis pellentesque fermentum.\n\nPellentesque mi velit, commodo et maximus ut, luctus id sem. Aliquam erat volutpat. Etiam rhoncus venenatis velit sed egestas. Integer at risus fermentum, maximus tortor at, facilisis justo. Donec gravida velit ac purus fermentum consequat. Nam auctor sed metus et placerat. Sed viverra posuere ante, sed cursus massa elementum eu. Duis ac viverra sapien.\n\nVestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam nibh justo, rhoncus id diam at, tincidunt feugiat dolor. Curabitur laoreet lorem quis orci rutrum commodo. Curabitur arcu ex, porttitor sed nunc at, pretium ornare libero. Nulla euismod hendrerit sagittis. Sed neque augue, interdum at magna lacinia, pretium laoreet massa. Aenean vitae est interdum, pulvinar nisl sed, facilisis neque. Integer ac nibh turpis. Etiam vel nulla purus. Praesent pulvinar enim vel quam cursus, vel fringilla diam viverra. In ac sollicitudin mi.\n\nCurabitur vel sollicitudin mi. Etiam lorem purus, luctus vel aliquet id, iaculis sed lacus. Pellentesque mattis felis non ligula convallis elementum. Phasellus egestas sodales tellus, eu lacinia neque auctor in. Duis feugiat lacus sed augue feugiat, sed viverra neque posuere. Nulla porttitor id lacus et accumsan. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse mollis sem eu gravida pharetra. Maecenas sodales rhoncus sagittis. Cras imperdiet risus sed vulputate dignissim. Suspendisse posuere varius dui, id hendrerit augue fermentum ac.\n\nFusce varius turpis eros. Integer fermentum ligula vel turpis pulvinar, sed tincidunt leo sollicitudin. Suspendisse elementum mattis metus, sed rhoncus tortor pretium id. Integer vestibulum, orci ut euismod suscipit, dui turpis egestas eros, et sodales arcu urna in magna. Curabitur tempus eu urna vel ullamcorper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Nam sodales lorem gravida velit facilisis, nec eleifend diam facilisis. Nullam at tempus lectus. Nunc a nisl feugiat, euismod enim id, semper ex. Sed convallis urna auctor erat malesuada, ac malesuada nunc scelerisque. Cras viverra pharetra justo, ut mollis metus tempor id.\n\nNunc iaculis sed nunc eu auctor. Maecenas purus nibh, porttitor quis massa eu, interdum ornare ipsum. Nullam at turpis ultricies, elementum purus id, rhoncus nibh. Proin ac nulla mauris. Proin nec leo vulputate, lobortis diam nec, pulvinar massa. Suspendisse vitae eros nec ex aliquam scelerisque tempor at diam. Duis egestas nibh non lectus condimentum vestibulum. Aliquam efficitur non turpis at tempor.',
    }
  }
}
export default language;