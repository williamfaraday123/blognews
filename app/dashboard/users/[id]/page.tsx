const Page = ({ params }: { params : { id: string }}) => {
    const { id } = params;

    return (
        <h1>User profile: {id}</h1>
    );
}

export default Page