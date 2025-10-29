 //@ts-nocheck

import axios from "axios";

export const ImageUploader = async (formData) => {

    try {
        const res = await axios.post("https://images.deepmart.shop/upload", formData);
        console.log(res.data?.[0])
        return res.data?.[0];
    } catch (error) {
        console.error("Image upload failed:", error);
        return null;
    }
};