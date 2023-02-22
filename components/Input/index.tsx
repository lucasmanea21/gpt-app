import { useState } from "react";
import { supabase } from "../../pages/api/supabase-client";

const Input = ({ session }: any) => {
  const [input, setInput] = useState("");

  const handleUpdateBio = async () => {
    const res = await supabase
      .from("profiles")
      .update({ bio: input })
      .eq("id", session?.user.id);

    console.log("res", res);
  };

  console.log("input", input);
  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => handleUpdateBio()}>Update bio</button>
    </div>
  );
};

export default Input;
