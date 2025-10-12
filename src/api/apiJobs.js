import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery, experience}) {
    const supabase = await supabaseClient(token)

    let Query = supabase.from("jobs").select("*, company:companies(name, logo_url), saved: saved_jobs(id), location: locations(city), experience: experiences(exp)")

    if (location) {
        Query = Query.eq("location", location);
    }

    if (experience) {
        Query = Query.eq("experience", experience);
    }

    if (company_id) {
        Query = Query.eq("company_id", company_id);
    }

    if (searchQuery) {
        Query = Query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await Query

    if (error) {
        console.error("Error fetching jobs:", error);
        return null;
    }
    return data;
}

export async function saveJob(token, { alreadySaved}, saveData) {
    const supabase = await supabaseClient(token); 

    if (alreadySaved){
        const { data, error:deleteError} = await supabase.from("saved_jobs")
        .delete()
        .eq("job_id", saveData.job_id);

        if (deleteError) {
            console.error("Error Deleting Saved jobs:", deleteError);
            return null;
        } 

        return data;
    } else{
        const { data, error:insertError} = await supabase.from("saved_jobs")
        .insert([saveData])
        .select();

        if (insertError) {
            console.error("Error inserting jobs:", insertError);
            return null;
        }
        return data;
    }
}

export async function getSingleJob(token, {job_id}) {
    const supabase = await supabaseClient(token); 

        const { data, error} = await supabase.from("jobs").select("*, company:companies(name, logo_url), applications: applications(*), location: locations(city), experience: experiences(exp)").eq("id", job_id).single();

        if (error) {
            console.error("Error Fetching Job:", error);
            return null;
        } 
    return data;
}

export async function updateHiringStatus(token, {job_id}, isOpen) {
    const supabase = await supabaseClient(token); 

        const { data, error} = await supabase.from("jobs").update({ isOpen }).eq("id", job_id).select();

        if (error) {
            console.error("Error Updating Job:", error);
            return null;
        } 
    return data;
}

export async function addNewJob(token, _, jobData) {
    const supabase = await supabaseClient(token); 

        const { data, error} = await supabase.from("jobs").insert([jobData]).select();

        if (error) {
            console.error("Error Creating Job:", error);
            return null;
        } 
    return data;
}

export async function getSavedJobs(token) {
    const supabase = await supabaseClient(token); 

        const { data, error} = await supabase.from("saved_jobs").select("*, job:jobs(*, company: companies(name, logo_url),  location: locations(city), experience: experiences(exp))");

        if (error) {
            console.error("Error Fetching Saved Jobs:", error);
            return null;
        } 
    return data;
}

export async function getMyJobs(token, {recruiter_id}) {
    const supabase = await supabaseClient(token); 

        const { data, error} = await supabase.from("jobs").select("*, company: companies(name,logo_url), location: locations(city), experience: experiences(exp)").eq("recruiter_id", recruiter_id);

        if (error) {
            console.error("Error Fetching Jobs:", error);
            return null;
        } 
    return data;
}

export async function deleteJob(token, {job_id}) {
    const supabase = await supabaseClient(token); 

        const { data, error} = await supabase.from("jobs").delete().eq("id", job_id).select();

        if (error) {
            console.error("Error Deleting Job:", error);
            return null;
        } 
    return data;
}