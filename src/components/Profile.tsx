type ProfileProps = {
  name?: string;
  desc: string;
};

const Profile = ({ name, desc }: ProfileProps) => {
  return (
    <div className="my-8">
      <p className="text-center">
        {desc}, <b>{name}</b>
      </p>
    </div>
  );
};

export default Profile;
