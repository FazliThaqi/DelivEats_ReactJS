import { SD_Status } from "../Utility/SD";
import orderDetail from "./orderDetailModel";

export default interface orderHeaderModel {
    orderHeaderId?: number;
    pickupName?: string;
    pickupPhoneNumber?: string;
    pickupEmail?: string;
    pickupAddress?: string;
    applicationUserId?: string;
    user?: any;
    orderTotal?: number;
    orderDate?: Date;
    stripePaymentIntentId?: string;
    status?: SD_Status;
    totalItems?: number;
    orderDetails?: orderDetail[];
  }

