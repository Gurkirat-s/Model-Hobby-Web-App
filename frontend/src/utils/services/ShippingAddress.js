export default class ShippingAddress {
  static address = {};
  static exists = false;

  static save = (address) => {
    this.address = address;
    this.exists = true;
  };
  static get = () => {
    return this.address;
  };
  static hasAddress = () => {
    return this.exists;
  };
}
