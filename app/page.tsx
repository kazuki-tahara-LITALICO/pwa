import Link from 'next/link';

const page = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/scan">scan</Link>
        </li>
        <li>
          <Link href="/notification">notification</Link>
        </li>
      </ul>
    </div>
  );
};

export default page;
