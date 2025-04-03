//here we write a function to filter null and undefined values from an array 

export function withoutNulls(children)  { 
    return children.filter((item) => item != null)
}