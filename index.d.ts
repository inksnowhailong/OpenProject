/* eslint-disable prettier/prettier */
declare interface Window {
  $elec: any;
}
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}