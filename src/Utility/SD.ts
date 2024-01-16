export enum SD_Roles {
    ADMIN = "admin",
    CUSTOMER = "customer",
    KITCHEN_MANAGER = "kitchen manager",
    DELIVERY = "delivery",
    
}

export enum SD_Status {
    PENDING = "Pending",
    CONFIRMED = "Confirmed",
    BEING_COOKED = "Being Cooked",
    READY_FOR_PICKUP = "Ready for Pickup",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled",
    OUT_FOR_DELIVERY = "Out for Delivery",
    DELIVERED = "Delivered",
}

export enum SD_Categories {
    APPETIZER = "Appetizer",
    ENTREE = "Entrée",
    DESSERT = "Dessert",
    BEVERAGES = "Beverages",
}

export enum SD_SortTypes{
    PRICE_LOW_HIGH = "Price Low - High",
    PRICE_HIGH_LOW = "Price High - Low",
    NAME_A_Z = "Name A - Z",
    NAME_Z_A = "Name Z - A",
}