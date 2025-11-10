import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFileAlt, 
  faChartLine, 
  faCogs, 
  faExchangeAlt, 
  faCode,
  faSun,
  faMoon,
  faSearch,
  faTools,
  faBook,
  faHome,
  faPlay,
  faTag,
  faHashtag,
  faAlignLeft,
  faEye,
  faChartBar,
  faGlobe,
  faServer,
  faShieldAlt,
  faDatabase,
  faTerminal,
  faKey,
  faPalette,
  faLink,
  faFingerprint,
  faHeart,
  faFilePdf,
  faPenFancy,
  faCalculator,
  faRobot,
  faStar,
  faArrowLeft,
  faFileContract,
  faObjectGroup,
  faCut,
  faCloudUploadAlt,
  faSpinner,
  faTimes,
  faDownload,
  faFileWord,
  faImages,
  faImage,
  faArrowUp,
  faArrowDown,
  faPause,
  faStop
} from '@fortawesome/free-solid-svg-icons'
import { faYoutube as fabYoutube } from '@fortawesome/free-brands-svg-icons'

const iconMap = {
  // Category icons
  'fab fa-youtube': fabYoutube,
  'fas fa-file-alt': faFileAlt,
  'fas fa-chart-line': faChartLine,
  'fas fa-cogs': faCogs,
  'fas fa-exchange-alt': faExchangeAlt,
  'fas fa-code': faCode,
  'fas fa-file-pdf': faFilePdf,
  'fas fa-shield-alt': faShieldAlt,
  'fas fa-pen-fancy': faPenFancy,
  'fas fa-palette': faPalette,
  'fas fa-calculator': faCalculator,
  'fas fa-search': faSearch,
  'fas fa-robot': faRobot,
  'fas fa-star': faStar,
  'fas fa-arrow-left': faArrowLeft,
  'fas fa-file-contract': faFileContract,
  'fas fa-object-group': faObjectGroup,
  'fas fa-cut': faCut,
  'fas fa-cloud-upload-alt': faCloudUploadAlt,
  'fas fa-spinner': faSpinner,
  'fas fa-times': faTimes,
  'fas fa-download': faDownload,
  'fas fa-file-word': faFileWord,
  'fas fa-images': faImages,
  'fas fa-image': faImage,
  'fas fa-arrow-up': faArrowUp,
  'fas fa-arrow-down': faArrowDown,
  'fas fa-play': faPlay,
  'fas fa-pause': faPause,
  'fas fa-stop': faStop,
  
  // UI icons
  'fas fa-sun': faSun,
  'fas fa-moon': faMoon,
  'fas fa-tools': faTools,
  'fas fa-book': faBook,
  'fas fa-home': faHome,
  
  // Tool-specific icons
  'fas fa-tag': faTag,
  'fas fa-hashtag': faHashtag,
  'fas fa-align-left': faAlignLeft,
  'fas fa-eye': faEye,
  'fas fa-chart-bar': faChartBar,
  'fas fa-globe': faGlobe,
  'fas fa-server': faServer,
  'fas fa-database': faDatabase,
  'fas fa-terminal': faTerminal,
  'fas fa-key': faKey,
  'fas fa-link': faLink,
  'fas fa-fingerprint': faFingerprint,
  'fas fa-heart': faHeart
}

const FontAwesomeIconComponent = ({ icon, className = '', style = {} }) => {
  const iconComponent = iconMap[icon]
  
  if (!iconComponent) {
    console.warn(`Icon "${icon}" not found in iconMap`)
    return null
  }
  
  return (
    <FontAwesomeIcon 
      icon={iconComponent} 
      className={className}
      style={style}
    />
  )
}

export default FontAwesomeIconComponent
