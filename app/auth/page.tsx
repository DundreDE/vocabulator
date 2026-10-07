// import { auth } from "@/app/auth/auth";
export default function AuthPage() {
      return (
        <main>
        <div>
            <div>
                <h1>Login/Regsiter</h1>
            </div>
            <div>
                <p> Please login or register to continue.</p>
                <p> At this point the Registration form is not ready just click on go to Dashboard.</p>
                <div>
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Login/Register</button>
                    <a href="/dashboard">Go to Dashboard</a>
                </div>
            </div>
        </div>
        </main>
  );
}

