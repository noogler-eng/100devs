import { Turnstile } from "@marsidev/react-turnstile";

function App() {
  return (
    <div>
      Hi i am sharad
      <div>
        {
          <Turnstile
            siteKey="0x4AAAAAABCoHbJQRWgRDFg3"
            onSuccess={() => {
              console.log("sucessss");
            }}
          />
        }
      </div>
    </div>
  );
}

export default App;
