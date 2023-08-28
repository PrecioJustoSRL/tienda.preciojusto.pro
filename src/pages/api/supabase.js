const { createClient } = require('@supabase/supabase-js')



const supabase_url = 'https://hhxlyesjmtbhnqwsoplw.supabase.co'
const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoeGx5ZXNqbXRiaG5xd3NvcGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQzMzE3NjYsImV4cCI6MTk5OTkwNzc2Nn0.MZQt6Je4Vj1-7wvGa4N0VxOg5o7AWZYbOeatVYU3sUc'

const supabase = createClient(supabase_url, anon_key)

const updateUserData = async (rute, object, uuid, eq) => {
    const result = await supabase
        .from(rute)
        .update(object)
        .eq(eq ? eq : 'uuid', uuid)
    // if (result.data !== null && result.data.length !== 0) {
    //     console.log('act')
    //     key ? updateContext({ ...context, [key]: result.data[0] }) : updateContext(arr == true ? result.data : result.data[0])
    // } 
    console.log(result)
}




const writeUserData = async (rute, object) => {
    console.log(object)

    const result = await supabase
        .from(rute)
        .insert(object)
    // console.log(result)
    // setUserSuccess ? setUserSuccess(msg) : ''
    // result.status == 201 ? readUserData(rute, uuid, updateContext) : (setUserSuccess ? setUserSuccess(msg) : '')
    console.log(result)
    return result
}

module.exports = { writeUserData, updateUserData};