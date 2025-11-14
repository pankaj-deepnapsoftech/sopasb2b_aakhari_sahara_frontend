// @ts-nocheck
export const LeftSubscriptionDays = (date) => {
    const endDate = new Date(date);
    const now = new Date();

    // difference in milliseconds
    const diffMs = endDate - now;

    // convert to days
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    return Math.floor(diffDays); 

}