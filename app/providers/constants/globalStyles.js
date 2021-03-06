import { StyleSheet, Platform } from 'react-native';
import colours from './colours';

const globalStyles = StyleSheet.create({
  screenBackground: { backgroundColor: colours.white },
  screenPadding: { flex: 1, paddingHorizontal: 10, paddingVertical: 20 },
  screenHorizontalPadding: { flex: 1, paddingHorizontal: 10 },
  screenHorizontalPaddingWithoutFlex: { paddingHorizontal: 10 },
  authBottomScreenMargin: { marginTop: 8 },
  authHWGreenBG: {
    flex: 1,
    backgroundColor: colours.green,
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  // to make shadow visible
  authFormikViewOuterContainer: { paddingTop: 6, paddingHorizontal: 6 },
  authFormikView: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colours.white,
    paddingTop: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  authFormikViewBG: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  greeting: {
    marginBottom: 25,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222222',
  },
  authGreetingSubText: {
    marginVertical: 32,
    marginHorizontal: 34,
    fontSize: 13,
    textAlign: 'center',
  },
  authGreetingSubTextLessMargin: {
    marginHorizontal: 34,
    marginBottom: 30,
    fontSize: 14,
    textAlign: 'center',
  },
  resetPasswordTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetPasswordChevron: { marginRight: '16%', marginTop: 5 },
  resetPasswordText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222222',
  },
  bigBtn: {
    marginVertical: 10,
    backgroundColor: colours.green,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bigBtn2: {
    marginVertical: 10,
    backgroundColor: colours.lightBlue,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  jrlBigBtn: {
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnText: { fontWeight: 'bold', color: colours.white },
  divider: {
    marginVertical: 10,
    marginHorizontal: 16,
    height: 0.5,
    width: '100%',
    backgroundColor: colours.veryLightGrey,
    alignSelf: 'center',
  },
  dividerActivityResource: {
    marginVertical: 5,
    marginHorizontal: 16,
    height: 0.5,
    width: '100%',
    backgroundColor: colours.borderGrey,
    alignSelf: 'center',
  },
  dividerSmallerWidth: {
    marginVertical: 10,
    marginHorizontal: 16,
    height: 0.5,
    width: '40%',
    backgroundColor: colours.veryLightGrey,
    alignSelf: 'center',
  },
  dividerShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  mildShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  bottomSheetTitleText: {
    color: colours.bottomSheetGray,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bottomSheetContainer: {
    backgroundColor: colours.white,
    borderWidth: 1.5,
    borderColor: colours.borderGrey,
    padding: 16,
    height: 250,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  projectIconContainer: {
    backgroundColor: colours.darkBlue,
    padding: 20,
    marginRight: 10,
    borderRadius: 4,
  },
  projectCardContainer: {
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 21,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 12,
  },
  projectCardDescriptionText: {
    marginVertical: 3,
    fontSize: 10.5,
  },
  bottomSheetItem: {
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSheetInnerItem: {
    backgroundColor: colours.green,
    padding: 5,
    borderRadius: 4,
    marginRight: 8,
  },
  rowIconCloserToLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  rowIconCloserToLabelContainer: { flexDirection: 'row', alignItems: 'center' },
  rowIconCloserToLabelSubText: { fontSize: 10, color: colours.gray },
  smallIconContainer: {
    padding: 10,
    borderRadius: 4,
    marginRight: 8,
  },
  cancelIconButton: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: colours.slightlyWhite,
    borderWidth: 0.5,
    borderColor: colours.borderGrey,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  saveIconButton: {
    flexDirection: 'row',
    marginRight: 5,
    backgroundColor: colours.saveGreen,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  saveContinueIconButton: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: colours.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bigTextBoxContainer: {
    marginTop: 10,
    marginBottom: 5,
    padding: 5,
    paddingBottom: 10,
    backgroundColor: colours.veryLightGrey,
    borderRadius: 8,
    alignItems: 'flex-start',
    height: Platform.OS && 170,
  },
  textBoxContainer: {
    marginTop: 10,
    marginBottom: 5,
    padding: 5,
    backgroundColor: colours.veryLightGrey,
    height: 44,
    borderRadius: 8,
  },
  codeTextBoxContainer: {
    marginTop: 10,
    marginBottom: 5,
    padding: 5,
    backgroundColor: colours.veryLightGrey,
    height: 44,
    borderRadius: 8,
    width: '12%',
  },
  textBoxContainerSmallerWidth: {
    marginTop: 10,
    marginBottom: 5,
    padding: 5,
    backgroundColor: colours.veryLightGrey,
    height: 44,
    borderRadius: 8,
    width: '55%',
  },
  androidPickerContainer: {
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colours.borderGrey,
  },
  addResourceFormContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderColor: colours.borderGrey,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  addResourceFormAddNewContainer: {
    alignItems: 'flex-end',
  },
  bottomSheetHandler: {
    height: 5,
    width: '15%',
    backgroundColor: colours.green,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 10,
  },
  notificationBadgeContainer: {
    position: 'absolute',
    height: 26,
    width: 26,
    borderRadius: 13,
    top: -5,
    right: -14,
    zIndex: 50,
    backgroundColor: colours.notificationBadgeRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    fontSize: Platform.OS === 'ios' ? 6 : 7,
    color: colours.white,
  },
  tabBodyContainer: { flex: 1, backgroundColor: 'transparent' },
  activeTabText: { fontSize: 11.5, fontWeight: 'bold' },
  inactiveTabText: { fontSize: 11.5, fontWeight: 'bold', color: colours.gray },
  addResourceCategoryLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addResourceButton: {
    padding: 8,
    backgroundColor: colours.manpowerBlue,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 12,
    marginRight: 12,
  },
  addResouceText: { color: colours.white, fontWeight: 'bold' },
  commonRowContainer: {
    paddingVertical: 8,
    width: '50%',
  },
  commonRowContainer2: {
    paddingVertical: 8,
    width: '100%',
  },
  commonRowLabelText: { marginTop: 5, marginBottom: 3, color: colours.gray },
  commonRowFlexDirection: { flexDirection: 'row' },
  userProfileTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -15,
    marginLeft: 18,
  },
  userProfileIconContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.white,
    height: 56,
    width: 56,
    borderRadius: 28,
    borderColor: colours.userIconBorderGray,
    borderWidth: 3,
    marginRight: 8,
  },
  userProfileDisplayNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colours.userProfileName,
  },
  userProfileEmailText: { color: colours.userProfileName },
  alertItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colours.white,
    paddingRight: 10,
  },
  alertItemContainerBottomBorder: {
    flex: 1,
    borderBottomColor: colours.borderGrey,
    borderBottomWidth: 1,
    marginTop: 10,
    paddingBottom: 10,
  },
  alertItemIconUnreadContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    padding: 3,
    backgroundColor: colours.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  alertItemIconReadContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    padding: 3,
    backgroundColor: colours.veryDarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  alertItemTitle: {
    color: colours.bottomSheetGray,
    fontWeight: 'bold',
    margin: 2,
  },
  alertItemDesc: {
    margin: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
  },
  alertItemTime: { fontSize: 10, color: colours.gray },
  alertItemBottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  alertItemJrlStatusContainer: {
    backgroundColor: colours.manpowerBlue,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  alertItemJrlStatusTxt: { fontSize: 10, color: colours.white },
  swipeButtonContainerRow: {
    height: '100%',
    flexDirection: 'row',
  },
  swipeButtonView: {
    backgroundColor: colours.lightBlue,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeButtonDelete: {
    backgroundColor: colours.redDeleteIcon,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: { fontWeight: 'bold', marginVertical: 5 },
  titleRowOuterContainer: {
    padding: 5,
    backgroundColor: colours.white,
    borderRadius: 8,
    marginTop: -15,
  },
  titleRowContainer: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colours.white,
    marginTop: 8,
    marginBottom: 5,
    textAlign: 'center',
  },
  titleSubText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colours.white,
  },
  mandatoryText: { color: 'red' },

  activityTitleContainer: {
    borderRadius: 8,
    backgroundColor: colours.copyJournalBorder,
    padding: 10,
    marginVertical: 5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colours.borderGrey,
  },
  activityIconTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityTitleTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityTitleText: { fontSize: 14 },
  activityTitleTextViewWidth: { width: '75%' },
  activityActionsContainer: { flexDirection: 'row', alignSelf: 'flex-end' },
  activitySubTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  activitySubText: {
    fontSize: 12,
    color: colours.gray,
  },
  activityTimeSubText: {
    fontSize: 11,
    color: colours.manpowerBlue,
  },
  revertVerifyConfirmText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: colours.gray,
    marginVertical: 10,
  },
  imageXButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 4,
    backgroundColor: colours.redDeleteIcon,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    marginVertical: 5,
    borderRadius: 8,
    paddingBottom: 3,
  },
  imagePreview: {
    resizeMode: 'cover',
    width: '100%',
    height: 250,
    borderRadius: 8,
  },
  alertsNotiContentContainer: {
    borderRadius: 8,
    backgroundColor: colours.white,
    padding: 8,
  },
  appbarSingleIconContainer: {
    flex: 1,
    height: '100%',
    paddingTop: 5,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  appbarDoubleIconContainer: {
    flex: 1.5,
    height: '100%',
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  appbarLeftIconCircle: {
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: colours.userIconContainerGreen,
  },
  appbarRightmostIconCircle: {
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.userIconContainerGreen,
  },
  formContainer: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: colours.borderGrey,
    borderRadius: 8,
    padding: 10,
  },
  moreOptionsText: { fontSize: 16, fontWeight: 'bold', marginVertical: 20 },
  moreOptionsContentText: { fontSize: 16 },
  moreOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moreOptionsIconContainer: {
    padding: 5,
    borderRadius: 4,
    marginRight: 8,
  },
  moreOptionsInnerContainer: { flexDirection: 'row', alignItems: 'center' },
  activityScreenTitleNoSubtext: {
    color: colours.lightBlue,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft: 3,
  },
  activityScreenTitle: {
    color: colours.lightBlue,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  activityScreenTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextButton: {
    color: colours.lightBlue,
    marginRight: 8,
    fontWeight: 'bold',
  },
  prevButton: { color: colours.lightBlue, marginLeft: 8, fontWeight: 'bold' },
  activityResourceAdd: { color: colours.green, fontWeight: 'bold' },
});

export default globalStyles;
