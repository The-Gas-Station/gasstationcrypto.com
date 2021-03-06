import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardTitle,
  MDBBtn,
  MDBCardText,
  MDBRipple,
  MDBCardImage,
} from 'mdb-react-ui-kit';

export const BridgeSection = (props: any) => {
  const { bridgeProps } = props;
  const { title, text, launchDate, btnText, btnLink, img } = bridgeProps;

  return (
    <MDBCard className="flex-fill card-list">
      <MDBRipple rippleTag="div" className="circle-img">
        <div className="circle-img-bg">
          <MDBCardImage src={img} fluid alt="" />
        </div>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle className="card-list-title text-center">
          {title}
        </MDBCardTitle>
        <MDBCardText>{text}</MDBCardText>
      </MDBCardBody>
      <MDBCardFooter>
        {launchDate && <span className="date-time">{launchDate}</span>}
        {btnText && (
          <MDBBtn
            className="btn-block"
            href={btnLink}
            target={btnLink && btnLink.includes('://') ? '_blank' : undefined}
            rel={
              btnLink && btnLink.includes('://')
                ? 'noopener noreferrer'
                : undefined
            }
          >
            {btnText}
          </MDBBtn>
        )}
      </MDBCardFooter>
    </MDBCard>
  );
};

export default BridgeSection;
