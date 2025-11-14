// @ts-nocheck
export const LeftSubscriptionDays = (date) => {
    console.log("this is date ====>>>>", date)
    const endDate = new Date(date);
    const now = new Date();

    // difference in milliseconds
    const diffMs = endDate - now;

    // convert to days
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    return diffDays.toFixed();

};

export const CheckSubscriptionIsEnd = (date) => {
    const endDate = new Date(date);
    const now = new Date();

    return endDate <= now 
}

export const isSubscriptionEnd = (date) => {
  const endDate = new Date(date);
    const now = new Date();

    return endDate < now 
}