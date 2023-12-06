import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  List,
  ListItem,
  OutlinedInput
} from '@mui/material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Upload, notification } from 'antd';
import { faExclamationTriangle, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { selectProps } from 'constant/other';
import DFnewLogger from 'utils/DFnewLogger';

const schoolList = [
  'Abraham Baldwin Agricultural College',
  'Academy of Art University',
  'Acadia University',
  'Adams State University',
  'Aelphi University',
  'Adrian College',
  'Adventist University Of Health Sciences',
  'Agness Scott college ',
  'AIB College of Business ',
  'Alaska Pacific University',
  'Albany College of Pharmacy and Health Sciences',
  'Albany State University',
  'Albertus Magnus College',
  'Albion College ',
  'AIbirght College',
  'Alderson Broaddust University',
  'Alfred University',
  'Alice Lloyd College',
  'Allegheny College',
  'Allen College',
  'Allen University',
  'Alliant International University',
  'ALma College',
  'Alvernia University',
  'Alverno College',
  'Amberton University',
  'America Academy of art',
  'American Indian college of the assemblies of god',
  'American InterContinental University',
  'American international college',
  'American jewish university',
  'American public University System',
  'American University',
  'American  university of bulgeria',
  'American university in cairo',
  'American university of Beirut',
  'American university of paris',
  'American University of Puerto rico',
  'Amherst college',
  'Amridge University',
  'Andeson university',
  'Andrews university',
  'Angelo state university',
  'anna maria college',
  'antioch University',
  'Appalachian Bible College',
  'Aquinas College',
  'Arcadia university',
  'Argosy University',
  'Arizona Christian University',
  'Arizona State University - West',
  'Arkansas Baptist College',
  'Arkansas Tech University',
  'Armstrong Atlantic State University',
  'Art Academy of Cincinnati',
  'Art Center College of Design',
  'Art Institute of Atlanta',
  'Art Institute of Colorado',
  'Art Institute of Houston',
  'Art Institute of Pittsburgh',
  'Art Institute of Portland',
  'Art Institute of Seattle',
  'Asbury University',
  'Ashford University',
  'Ashland University',
  'Assumption College',
  'Athens State University',
  'Auburn University - Montgomery',
  'Augsburg College',
  'Augustana College',
  'Aurora University',
  'Austin College',
  'Alcorn State University',
  'Alcorn State University',
  'Ave Maria University',
  'Averett University',
  'Avila University',
  'Azusa Pacific University',
  'Babson College',
  'Bacone College',
  'Baker College of Flint',
  'Baker University',
  'Baldwin Wallace University',
  'Christian Brothers University',
  'Abilene Christian University',
  'Arizona State University',
  'Auburn University',
  'Alabama A&amp;M University',
  'Alabama State University',
  'Arkansas State University',
  'Baptist Bible College',
  'Baptist Bible College and Seminary',
  'Baptist College of Florida',
  'Baptist Memorial College of Health Sciences',
  'Baptist Missionary Association Theological Seminary',
  'Bard College',
  "Bard College at Simon's Rock",
  'Barnard College',
  'Barry University',
  'Barton College',
  'Bastyr University',
  'Bates College',
  'Bauder College',
  'Bay Path College',
  'Bay State College',
  'Bayamon Central University',
  'Beacon College',
  'Becker College',
  'Belhaven University',
  'Bellarmine University',
  'Bellevue College',
  'Bellevue University',
  'Bellin College',
  'Belmont Abbey College',
  'Belmont University',
  'Beloit College',
  'Bemidji State University',
  'Benedict College',
  'Benedictine College',
  'Benedictine University',
  'Benjamin Franklin Institute of Technology',
  'Bennett College',
  'Bennington College',
  'Bentley University',
  'Berea College',
  'Berkeley College',
  'Berklee College of Music',
  'Berry College',
  'Bethany College',
  'Bethany Lutheran College',
  'Bethel College',
  'Bethel University',
  'BI Norwegian Business School',
  'Binghamton University - SUNY',
  'Biola University',
  'Birmingham-Southern College',
  'Bismarck State College',
  'Black Hills State University',
  'Blackburn College',
  'Blessing-Rieman College of Nursing',
  'Bloomfield College',
  'Bloomsburg University of Pennsylvania',
  'Blue Mountain College',
  'Bluefield College',
  'Bluffton University',
  'Boricua College',
  'Boston Architectural College',
  'Boston Conservatory',
  'Boston University',
  'Bowdoin College',
  'Bowie State University',
  'Bradley University',
  'Brandeis University',
  'Brandman University',
  'Brazosport College',
  'Brenau University',
  'Brescia University',
  'Brevard College',
  'Brewton-Parker College',
  'Briar Cliff University',
  'Briarcliffe College',
  'Bridgewater College',
  'Bridgewater State University',
  'Brigham Young University - Hawaii',
  'Brigham Young University - Idaho',
  'Brock University',
  'Bryan College',
  'Bryn Athyn College of the New Church',
  'Bryn Mawr College',
  'Boston College',
  'Buena Vista University',
  'Buena Vista University',
  'Burlington College',
  'Bowling Green State University',
  'Brown University',
  'Appalachian State University',
  'Brigham Young University - Provo',
  'Cabarrus College of Health Sciences',
  'Cabrini College',
  'Cairn University',
  'Caldwell College',
  'California Baptist University',
  'California College of the Arts',
  'California Institute of Integral Studies',
  'California Institute of Technology',
  'California Institute of the Arts',
  'California Lutheran University',
  'California Maritime Academy',
  'California State Polytechnic University - Pomona',
  'California State University - Bakersfield',
  'California State University - Channel Islands',
  'California State University - Chico',
  'California State University - Dominguez Hills',
  'California State University - East Bay',
  'California State University - Fullerton',
  'California State University - Los Angeles',
  'California State University - Monterey Bay',
  'California State University - Northridge',
  'California State University - San Bernardino',
  'California State University - San Marcos',
  'California State University - Stanislaus',
  'California University of Pennsylvania',
  'Calumet College of St. Joseph',
  'Calvary Bible College and Theological Seminary',
  'calvin college',
  'cambridge college',
  'Cameron University',
  'Campbellsville University',
  'Canisius College',
  'Capella University',
  'Capital University',
  'Capitol College',
  'Cardinal Stritch University',
  'Caribbean University',
  'Carleton College',
  'Carlos Albizu University',
  'Carlow University',
  'Carnegie Mellon University',
  'Carroll College',
  'Carroll University',
  'Carson-Newman University',
  'Carthage College',
  'Case Western Reserve University',
  'Castleton State College',
  'Catawba College',
  'Cazenovia College',
  'Cedar Crest College',
  'Cedarville University',
  'Centenary College',
  'Centenary College of Louisiana',
  'Central Bible College',
  'Central Christian College',
  'Central College',
  'Central Methodist University',
  'Central Penn College',
  'Central State University',
  'Central Washington University',
  'Centre College',
  'Chadron State College',
  'Chamberlain College of Nursing',
  'Chaminade University of Honolulu',
  'Champlain College',
  'Chancellor University',
  'Chapman University',
  'Charles R. Drew University of Medicine and Science',
  'Charter Oak State College',
  'Chatham University',
  'Chestnut Hill College',
  'Cheyney University of Pennsylvania',
  'Chicago State University',
  'Chipola College',
  'Chowan University',
  'Christendom College',
  'Baylor University',
  'Central Connecticut State University',
  'Central Michigan University',
  'Charleston Southern University',
  'California State University - Sacramento',
  'California State University - Fresno',
  'Campbell University',
  'Christopher Newport University',
  'Cincinnati Christian University',
  'Cincinnati College of Mortuary Science',
  'City University of Seattle',
  'Claflin University',
  'Claremont McKenna College',
  'Clarion University of Pennsylvania',
  'Clark Atlanta University',
  'Clark University',
  'Clarke University',
  'Clarkson College',
  'Clarkson University',
  'Clayton State University',
  'Clear Creek Baptist Bible College',
  'Clearwater Christian College',
  'Cleary University',
  'College of William and Mary',
  'Cleveland Chiropractic College',
  'Cleveland Institute of Art',
  'Cleveland Institute of Music',
  'Cleveland State University',
  'Coe College',
  'Cogswell Polytechnical College',
  'Coker College',
  'Colby College',
  'Colby-Sawyer College',
  'College at Brockport - SUNY',
  'College for Creative Studies',
  'College of Charleston'
];
const degreeList = [
  "Associate's Degree",
  'High School',
  'Master of Business Administration',
  'Juris Doctor',
  'Doctor Of Medicine',
  'Doctor of Philosophy',
  'Engineers Degree',
  'Others'
];
const disciplineList = [
  'Accounting',
  'African Studies',
  'Agriculture',
  'Anthropology',
  'Applied Health Service',
  'Architecture',
  'Art',
  'Asian Studies',
  'Biology',
  'Business',
  'Business Administration ',
  'Chemistry',
  'Communication and film',
  'Computer Science',
  'Dentistry',
  'Developing Nations',
  'Discipline Unknown',
  'Earth Scinece ',
  'Economics',
  'Education',
  'Electronics',
  'Engineering',
  'English Studies',
  'Environmental studies',
  'European studies',
  'Fashion',
  'Finance',
  'fine arts',
  'general studies',
  'Health service',
  'History',
  'Human resource system',
  'Humanities',
  'Industrial art and carpenter',
  'Information system',
  'International relations',
  'journalism',
  'languages',
  'altin american studies',
  'law',
  'linguistics',
  'manufactuiring and mechanics',
  'mathematics',
  'medicine',
  'middle eastern studies',
  'naval science',
  'north american studies',
  'Nuclear technics',
  'Operations Research &amp; Strategy',
  'Organizational Theory',
  'philosophy',
  'Physical Education',
  'Physical Sciences',
  'physics',
  'Political Science',
  'Psychology',
  'Psychology',
  'Public Policy',
  'Public Service',
  'Religious Studies',
  'Russian &amp; Soviet Studies',
  'Scandinavian Studies',
  'Science',
  'Slavic Studies',
  'Social Science',
  'Social Sciences',
  'Sociology',
  'Speech',
  'Speech',
  'Statistics',
  'Decision Theory',
  'Urban Studies',
  'Veterinary Medicine'
];
const howHear = ['Career page', 'Linkedin', 'Glassdor', 'Indeed', 'Builtin', 'PR Announcement', 'Employee Referral'];
const veteranList = [
  'I am not a protected veteran',
  'I identify as one or more of the classfication of a protected veteran',
  "I don't wish to answer"
];
const disabilities = [
  'Blindness',
  'Deafness',
  'Cancer',
  'Diabetes',
  'Epilepsy',
  'Autism',
  'Cerebral palsy',
  'HIV/AIDS',
  'Schizophrenia',
  'Muscular dystrophy',
  'Bipolar disorder',
  'Major depression',
  'Multiple sclerosis (MS)',
  'Missing limbs or partially missing limbs',
  'Post-traumatic stress disorder (PTSD)',
  'Obsessive compulsive disorder',
  'Impairments requiring the use of a wheelchair',
  'Intellectual disability (previously called mental retardation)'
];
const disabilityList = [
  'Yes, I have a disability (or previously had a disability)',
  "No, I don't have a disability",
  "I don't wish to answer"
];
const genderList = ['Male', 'Female', 'Decline To Self Identity'];
const hispanicList = ['Yes', 'No', 'Decline To Self Identity'];
const boolList = ['Yes', 'No'];

const ForJob = ({ ...others }) => {
  notification.config({
    placement: 'topRight',
    top: 80,
    duration: 3,
    closeIcon: <></>
  });
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      notification.error({
        message: <Typography className="notification-message">File Type Error</Typography>,
        icon: <FontAwesomeIcon icon={faExclamationTriangle} className="notification-icon" />,
        className: 'notification-error'
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notification.error({
        message: <Typography className="notification-message">File Size Error</Typography>,
        icon: <FontAwesomeIcon icon={faExclamationTriangle} className="notification-icon" />,
        className: 'notification-error'
      });
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <>
      <Box className="for-job">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            school: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().max(20).required('First Name is required'),
            lastName: Yup.string().max(20).required('Last Name is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required')
          })}
          onSubmit={async (values) => {
            DFnewLogger(values);
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <Form noValidate onSubmit={handleSubmit} {...others}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <span className="for-job-title">Apply for this Job </span>(<span style={{ color: 'red' }}> * </span>
                  <span> Required </span>)
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)}>
                    <InputLabel>
                      First Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="First Name *"
                      value={values.firstName}
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText id="helper-text-firstName" error>
                        {errors.firstName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)}>
                    <InputLabel>
                      Last Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Last Name *"
                      value={values.lastName}
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText error id="standard-weight-helper-text--signup">
                        {errors.lastName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                    <InputLabel>
                      Email <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Email *"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText id="helper-text-email" error>
                        {errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                    <InputLabel>
                      Phone <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Phone *"
                      value={values.phone}
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.phone && errors.phone && (
                      <FormHelperText id="helper-text-phone" error>
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={Boolean(touched.city && errors.city)}>
                    <InputLabel>
                      Location (City) <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Location (City) *"
                      value={values.city}
                      name="city"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.city && errors.city && (
                      <FormHelperText id="helper-text-city" error>
                        {errors.city}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3} sx={{ my: 'auto' }}>
                  <Upload
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    <Button
                      className="upload-btn"
                      variant="outlined"
                      startIcon={<FontAwesomeIcon icon={faArrowUpFromBracket} style={{ fontSize: '15px' }} />}
                    >
                      (Resume/CV) Upload
                    </Button>
                  </Upload>
                  <Typography>
                    (1MB: Word, PDF) <span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} sx={{ my: 'auto' }}>
                  <Upload
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    <Button
                      className="upload-btn"
                      variant="outlined"
                      startIcon={<FontAwesomeIcon icon={faArrowUpFromBracket} style={{ fontSize: '15px' }} />}
                    >
                      (Cover Letter) Upload
                    </Button>
                  </Upload>
                  <Typography>
                    (1MB: Word, PDF) <span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider className="custom-divider" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>School</InputLabel>
                    <Select
                      size="small"
                      label="School"
                      value={values.school}
                      name="school"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      MenuProps={selectProps}
                    >
                      {schoolList.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Degree</InputLabel>
                    <Select
                      size="small"
                      label="Degree"
                      value={values.degree}
                      name="degree"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      MenuProps={selectProps}
                    >
                      {degreeList.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Discipline</InputLabel>
                    <Select
                      size="small"
                      label="Discipline"
                      value={values.discipline}
                      name="discipline"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      MenuProps={selectProps}
                    >
                      {disciplineList.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Linkedin Profile</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Linkedin Profile"
                      value={values.linkedinProfile}
                      name="linkedinProfile"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>How did you hear about this job?</InputLabel>
                    <Select
                      size="small"
                      label="How did you hear about this job?"
                      value={values.howHear}
                      name="howHear"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      MenuProps={selectProps}
                    >
                      {howHear.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>If you selected employee referral, please indicate who referred you.</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="If you selected employee referral, please indicate who referred you."
                      value={values.referred}
                      name="referred"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>What are your compensation expectations?</InputLabel>
                    <OutlinedInput
                      size="small"
                      label="What are your compensation expectations?"
                      value={values.expecatation}
                      name="expecatation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>
                      Are you legally authorized to work in the United States?
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      size="small"
                      label="Are you legally authorized to work in the United States? *"
                      value={values.authorized}
                      name="authorized"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      MenuProps={selectProps}
                    >
                      {boolList.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>
                      Will you now or in the future require sponsorship to work in the United States?
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      size="small"
                      label="Will you now or in the future require sponsorship to work in the United States? *"
                      value={values.sponsorship}
                      name="sponsorship"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      MenuProps={selectProps}
                    >
                      {boolList.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>
                      Are you available to work mornings? Please list hours available{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Are you available to work mornings? Please list hours available *"
                      value={values.morning}
                      name="morning"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>
                      Are you available to work during the daytime? Please list hours available{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Are you available to work during the daytime? Please list hours available *"
                      value={values.daytime}
                      name="daytime"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>
                      Are you available to work evenings? Please list hours available{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Are you available to work evenings? Please list hours available *"
                      value={values.evening}
                      name="evening"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>
                      Are you available to work weekends? Please list hours available{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Are you available to work weekends? Please list hours available *"
                      value={values.weekend}
                      name="weekend"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>
                      Are you interested in this role in a full-time capacity?
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      size="small"
                      label="Are you interested in this role in a full-time capacity? *"
                      value={values.fulltime}
                      name="fulltime"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      MenuProps={selectProps}
                    >
                      {boolList.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Divider className="custom-divider" />
                </Grid>
                <Grid item xs={12}>
                  <Typography className="for-job-sub-title2">
                    U.S. Equal Opportunity Employment Information (Completion is voluntary)
                  </Typography>
                  <Typography className="for-job-content">
                    Individuals seeking employment at Drape Fit are considered without regards to race, color, religion,
                    national origin, age, sex, marital status, ancestry, physical or mental disability, veteran status,
                    gender identity, or sexual orientation. You are being given the opportunity to provide the following
                    information in order to help us comply with federal and state Equal Employment
                    Opportunity/Affirmative Action record keeping, reporting, and other legal requirements.
                  </Typography>
                  <Typography className="for-job-content">
                    Completion of the form is entirely voluntary. Whatever your decision, it will not be considered in
                    the hiring process or thereafter. Any information that you do provide will be recorded and
                    maintained in a confidential file
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      size="small"
                      label="Gender"
                      value={values.gender}
                      name="gender"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      MenuProps={selectProps}
                    >
                      {genderList.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Are you Hispanic/Lantino?</InputLabel>
                    <Select
                      size="small"
                      label="Are you Hispanic/Lantino?"
                      value={values.hispanic}
                      name="hispanic"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      MenuProps={selectProps}
                    >
                      {hispanicList.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Link to="#">Race & Ethnicity Definitions</Link>
                  <Typography className="for-job-content">
                    If you believe you belong to any of the categories of protected veterans listed below, please
                    indicate by making the appropriate selection. As a government contractor subject to Vietnam Era
                    Veterans Readjustment Assistance Act (VEVRAA), we request this information in order to measure the
                    effectiveness of the outreach and positive recruitment efforts we undertake pursuant to VEVRAA.
                    Classification of protected categories is as follows:
                  </Typography>
                  <Typography className="for-job-content">
                    A "disabled veteran" is one of the following: a veteran of the U.S. military, ground, naval or air
                    service who is entitled to compensation (or who but for the receipt of military retired pay would be
                    entitled to compensation) under laws administered by the Secretary of Veterans Affairs; or a person
                    who was discharged or released from active duty because of a service-connected disability.
                  </Typography>
                  <Typography className="for-job-content">
                    A "recently separated veteran" means any veteran during the three-year period beginning on the date
                    of such veteran's discharge or release from active duty in the U.S. military, ground, naval, or air
                    service.
                  </Typography>
                  <Typography className="for-job-content">
                    An "active duty wartime or campaign badge veteran" means a veteran who served on active duty in the
                    U.S. military, ground, naval or air service during a war, or in a campaign or expedition for which a
                    campaign badge has been authorized under the laws administered by the Department of Defense.
                  </Typography>
                  <Typography className="for-job-content">
                    An "Armed forces service medal veteran" means a veteran who, while serving on active duty in the
                    U.S. military, ground, naval or air service, participated in a United States military operation for
                    which an Armed Forces service medal was awarded pursuant to Executive Order 12985.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Veteran Status</InputLabel>
                    <Select
                      size="small"
                      label="veteran status"
                      value={values.veteran}
                      name="veteran"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      MenuProps={selectProps}
                    >
                      {veteranList.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Divider className="custom-divider" />
                </Grid>
                <Grid item xs={12}>
                  <Typography className="for-job-info" align="right">
                    Form CC-305
                  </Typography>
                  <Typography className="for-job-info" align="right">
                    OMB Control Number 1250-0005
                  </Typography>
                  <Typography className="for-job-info" align="right">
                    Expires 1/31/2020
                  </Typography>
                  <Typography className="for-job-sub-title1">Voluntary Self-Identification of Disability</Typography>
                  <Typography className="for-job-sub-title2">Why are you being asked to complete this form?</Typography>
                  <Typography className="for-job-content">
                    Because we do business with the government, we must reach out to, hire, and provide equal
                    opportunity to qualified people with disabilities1. To help us measure how well we are doing, we are
                    asking you to tell us if you have a disability or if you ever had a disability. Completing this form
                    is voluntary, but we hope that you will choose to fill it out. If you are applying for a job, any
                    answer you give will be kept private and will not be used against you in any way.
                  </Typography>
                  <Typography className="for-job-content">
                    If you already work for us, your answer will not be used against you in any way. Because a person
                    may become disabled at any time, we are required to ask all of our employees to update their
                    information every five years. You may voluntarily self-identify as having a disability on this form
                    without fear of any punishment because you did not identify as having a disability earlier.
                  </Typography>
                  <Typography className="for-job-sub-title2">How do I know if I have a disability?</Typography>
                  <Typography className="for-job-content">
                    You are considered to have a disability if you have a physical or mental impairment or medical
                    condition that substantially limits a major life activity, or if you have a history or record of
                    such an impairment or medical condition.
                  </Typography>
                  <Typography className="for-job-content">Disabilities include, but are not limited to:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <List
                    sx={{
                      listStyleType: 'disc',
                      pl: '3vw',
                      pr: '3vw',
                      '& .MuiListItem-root': {
                        display: 'list-item'
                      }
                    }}
                  >
                    {disabilities.map((item, index) => (
                      <ListItem key={index}>{item}</ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Disability Status</InputLabel>
                    <Select
                      size="small"
                      value={values.disability}
                      name="disability"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      MenuProps={selectProps}
                    >
                      {disabilityList.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography className="for-job-sub-title2">Reasonable Accommodation Notice</Typography>
                  <Typography className="for-job-content">
                    Federal law requires employers to provide reasonable accommodation to qualified individuals with
                    disabilities. Please tell us if you require a reasonable accommodation to apply for a job or to
                    perform your job. Examples of reasonable accommodation include making a change to the application
                    process or work procedures, providing documents in an alternate format, using a sign language
                    interpreter, or using specialized equipment.
                  </Typography>
                  <Typography className="for-job-content">
                    1Section 503 of the Rehabilitation Act of 1973, as amended. For more information about this form or
                    the equal employment obligations of Federal contractors, visit the U.S. Department of Labor's Office
                    of Federal Contract Compliance Programs (OFCCP) website at
                  </Typography>
                  <Typography className="for-job-content">
                    PUBLIC BURDEN STATEMENT: According to the Paperwork Reduction Act of 1995 no persons are required to
                    respond to a collection of information unless such collection displays a valid OMB control number.
                    This survey should take about 5 minutes to complete. <Link>www.dol.gov/ofccp</Link>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider className="custom-divider" />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText id="helper-text-submit" error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
              <Box sx={{ float: 'right' }}>
                <AnimateButton>
                  <Button
                    className="rounded-gradient-btn"
                    type="submit"
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    variant="contained"
                    color="secondary"
                  >
                    SUBMIT APPLICATION
                  </Button>
                </AnimateButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ForJob;
