import HeadingText from '../../components/HeadingText';
import RegionTable from './RegionTable';
import './styles.css'
export default function Dashboard() {

  return (
    <div className="container">
   <div className='heading-container'>
     <HeadingText text={'Marketing Dashboard'}/>
   </div>
    <RegionTable/>
    </div>
  );
}
