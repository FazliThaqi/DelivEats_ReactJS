import { SD_Status } from "../Utility/SD";

const getStatusColor = (status: SD_Status) => {
    return status ===SD_Status.CONFIRMED? "primary"
     : status === SD_Status.PENDING? "danger"
     : status === SD_Status.CANCELLED? "danger"
     : status === SD_Status.COMPLETED? "info"
     : status === SD_Status.BEING_COOKED? "secondary"
     : status === SD_Status.READY_FOR_PICKUP? "warning"
     : status === SD_Status.OUT_FOR_DELIVERY? "info"
     : status === SD_Status.DELIVERED && "success";

}

export default getStatusColor;