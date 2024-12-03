import Link from "next/link";

const Page = () => {
    return (
        <div>
            <ul>
                {[1, 2, 3, 4].map((user) => (
                    <li><Link href={`users/${user}`}>{user}</Link></li>
                ))}
            </ul>
        </div>
    );
}

export default Page