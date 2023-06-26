import React, { useEffect } from 'react';

export default function PasswordLessLogin() {
  useEffect(() => {
    require('@passageidentity/passage-auth');
  }, []);
  return (
    <div>
      <passage-auth
        app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}
      ></passage-auth>
    </div>
  );
}
