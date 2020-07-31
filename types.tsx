export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  ViewBill: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  NotFound: undefined;
  FaceDetection: undefined;
}

export type BottomTabParamList = {
  HomeScreenTab: undefined;
  BillScreenTab: undefined;
  OutageScreenTab: undefined;
  MoreOptionsScreenTab: undefined;
};

export type HomeScreenParams = {
  HomeScreen: undefined;
};

export type BillScreenParams = {
  BillScreen: undefined;
  MeterReading: undefined;
  MeterReadingCamera: undefined;
  PaymentHistory: undefined;
  BillAnalytics: undefined;
};

export type OutageScreenParams = {
  OutageScreen: undefined;
  OutageMap: undefined;
  GasEmergency: undefined;
  ReportOutage: undefined;
  DiagnoseOutage: undefined;
};

export type MoreOptionScreenParams = {
  MoreOptionsScreen: undefined;
  EnrollPrograms: undefined;
  SafetyInfo: undefined;
  PushNotifications: undefined;
};
