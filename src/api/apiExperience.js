import supabaseClient from "@/utils/supabase";

export async function getExperiences(token) {
    const supabase = await supabaseClient(token); 

        const { data, error} = await supabase.from("experiences").select("*");

        if (error) {
            console.error("Error Fetching locations:", error);
            return null;
        } 
    return data;
}

export async function addNewExperience(token, _, experienceData) {
    const supabase = await supabaseClient(token); 

        const { data, error} = await supabase.from("experiences").insert([{
            exp: experienceData.exp
        }]).select();

        if (error) {
            console.error("Error Creating Location:", error);
            return null;
        } 
    return data;
}