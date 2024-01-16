/*This HOC adds authentication logic to the component
 given as an argument and returns that new component,
 which is equipped with authentication functionality.*/

const withAuth = (WrappedComponent : any)=>{
    return(props: any)=>{
        
        const accessToken = localStorage.getItem("token");
        if(!accessToken){
            window.location.replace("/login");
            return null;
        }
        return <WrappedComponent {...props}/>;
       
    };
};
export default withAuth;