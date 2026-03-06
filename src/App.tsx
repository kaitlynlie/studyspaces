import { Home } from "./pages/Home";

function App() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate a delay to showcase the loading animation
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <Home />
  //   <div className={clsx(styles.app)}>
  //     {isLoading ? (
  //       <LoadingPage />
  //     ) : (
  //       <>
  //         <Routes>
  //           <Route index path="/" element={<Menu />} />
  //           <Route path="/cafe" element={<Home />} />
  //           <Route path='/park' element={<Park />} />
  //         </Routes>
  //       </>
  //     )}
  //   </div>
  );
}

export default App;