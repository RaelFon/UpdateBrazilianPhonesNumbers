import { BackofficeAxios } from "./axios/backoffice";
import { ChecklistAxios } from "./axios/checklist";
import { PhoneVerification } from "./phone-verification/phone-verification";
import { UpdateHomeOwnerPhoneService } from "./services/update-home-owner-phones";
import { UpdatePartnerPhoneService } from "./services/update-partner-phones";

const phoneVerification = new PhoneVerification()
const backofficeAxios = new BackofficeAxios()
const checklistAxios = new ChecklistAxios()

const updateHomeOwnerPhoneService = new UpdateHomeOwnerPhoneService(phoneVerification, backofficeAxios, checklistAxios)
// const updatePartnerPhoneService = new UpdatePartnerPhoneService(phoneVerification, backofficeAxios)

updateHomeOwnerPhoneService.start()
// updatePartnerPhoneService.start()   