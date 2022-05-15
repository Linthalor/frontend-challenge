## Architecture
Based off redux's typescript template using the redux toolkit to make slices. This is also using axios for the http client, material ui for the presentation, and io-ts for an anti-corruption layer.

## things I'd consider to do in the future:
 - move to https: sending plain text passwords isn't great (obviously just a simplification for the coding excercise)
 - testing: unit and e2e (given the limited scope of the excercise, manual testing seemed reasonable enough)
 - Internationalization: it's only in english and presumably for something public facing it should support multiple languages
 - Accessibility pass: I made some effort for screenreaders etc., but did not do a pass using one, so there are probably improvements to be made.
 - Send errors and other metrics to some dev-ops service.
 - Potentially refactor the form to cover the whole login process, such that it could just submit at the end instead of having a submission at each step, might make browser save password notifications more cleaner.
 - Explore animated transitions between the login pages, signup loading indicator, and the result.
 - Could route guard each step of the signup form to require the form data up until that point. At the moment only the signup result is guarded and seems suficient.
 - Add in better password validators, such as requiring special characters and numbers.
 - Fix a small edge case: There is case where using the forward/backward browser buttons where you won't update the form state if you've changed a field before navigating around. Could potentially be solved with the per signup stage route guards and saving to redux reguardless of correctness (as you won't be able to do the final submit unless the whole form is valid). It could however be determined that this is correct behaviour as you are navigating to the page where the data is the same as it was.