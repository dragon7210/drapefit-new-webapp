import PropTypes from 'prop-types';

const GiftcardMail = ({ data }) => {
  console.log(data);
  return (
    <div className="giftcard">
      <div className="giftTitle">
        <div>
          <p className="title">TO</p>
          <div className="type1">
            <p>TO NAME</p>
            <p>{data.to_name}</p>
          </div>
          <div className="type1">
            <p>TO Address</p>
            <p>{data.to_email}</p>
          </div>
        </div>
        <div>
          <img alt="logo" src="https://www.drapefittest.com/img/logo.png" />
        </div>
      </div>
      <div className="giftbody">
        <p>{data.giftcode}</p>
      </div>
      <div className="giftright">
        <div>
          <p className="title">FROM</p>
          <div className="type1">
            <p>FROM NAME</p>
            <p>{data.from_name}</p>
          </div>
          <div className="type1">
            <p>FROM EMAIL</p>
            <p>{data.from_email}</p>
          </div>
        </div>
      </div>
      <div className="giftfooter">
        <p>BIRTHDAY</p>
        <p>AMOUNT : {data.price}</p>
        <p>EXPIRE ON : {data.expiry_date}</p>
      </div>
    </div>
  );
};

GiftcardMail.propTypes = {
  data: PropTypes.object
};
export default GiftcardMail;
