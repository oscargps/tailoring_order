import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { SupaBaseClient } from "../../../core/utils/supabaseClient";
import { Navigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";

const supabase = new SupaBaseClient();

const Login = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);


  if (!session) {
    return (
      <div className=" w-full md:w-2/6 m-auto overflow-y-hidden flex flex-col justify-between">
        <img src="../../../../public/sewing-machine-green.png" alt="" className="h-40 w-40 self-center" />
        <h1 className="self-center mb-4">Gestión de pedidos de confección</h1>
        <Auth
          // theme="dark"
          supabaseClient={supabase.client}
          appearance={{
            theme: ThemeSupa, style: {
              button: { background: '#37996b', color: 'white' },
            }
          }}
          providers={[]}
          redirectTo="/dashboard"
          showLinks={false}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Correo electrónico',
                password_label: 'Contraseña',
                email_input_placeholder: '',
                password_input_placeholder: '',
                button_label: "Ingresar",
                loading_button_label:"Ingresando..."
              },
            },
          }}
        />
      </div>
    );
  } else {
    return <Navigate to={'/dashboard'} />
  }
};

export default Login;
