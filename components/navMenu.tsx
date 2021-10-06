interface props {
  userData: { email: string; firstName: string; lastName: string };
}

export default function NavMenu({ userData }: props) {
  return (
    <h1>
      hi {userData.firstName} {userData.lastName}
    </h1>
  );
}
