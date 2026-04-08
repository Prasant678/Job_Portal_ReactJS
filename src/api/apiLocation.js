import supabaseClient from "@/utils/supabase";

export async function getLocations(token) {
    const supabase = await supabaseClient(token); 

        const { data, error} = await supabase.from("locations").select("*");

        if (error) {
            console.error("Error Fetching locations:", error);
            return null;
        } 
    return data;
}

export async function addNewLocation(token, _, locationData) {
    const supabase = await supabaseClient(token); 

        const { data, error} = await supabase.from("locations").insert([{
            city: locationData.city
        }]).select();

        if (error) {
            console.error("Error Creating Location:", error);
            return null;
        } 
    return data;
}
