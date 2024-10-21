export class PhoneVerification {
  constructor() {}

  isItToUpdate(phone: string): boolean {
    return this.isBrazilianNumber(phone) && !this.hasBrazilCode(phone);
  }

  isBrazilianNumber(phone: string): boolean {
    const phoneUtil =
      require("google-libphonenumber").PhoneNumberUtil.getInstance();

    if (phone.length <= 15) {
      return phoneUtil.isValidNumberForRegion(
        phoneUtil.parse(phone, "BR"),
        "BR"
      );
    } else {
      return false;
    }
  }

  hasBrazilCode(phone: string): boolean {
    return phone.startsWith("55");
  }

  addBrazilianCountryCode(phone: string): string {
    return `55${phone}`;
  }
}
