import { useState } from 'react';
import { MDBModal } from 'mdb-react-ui-kit';

type modalOpen = {
  showConditions: boolean;
  setIsOpen: any;
  closeConditions: any;
};

export const TermsConditions = ({
  showConditions,
  setIsOpen,
  closeConditions,
}: modalOpen) => {
  const stepOne = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const toggleTwo = () => setStepTwo(!stepTwo);
  const [stepThree, setStepThree] = useState(false);
  const toggleThree = () => setStepThree(!stepThree);
  const [stepFour, setStepFour] = useState(false);
  const toggleFour = () => setStepFour(!stepFour);
  const [stepFive, setStepFive] = useState(false);
  const toggleFive = () => setStepFive(!stepFive);
  const [stepSix, setStepSix] = useState(false);
  const toggleSix = () => setStepSix(!stepSix);
  const [stepSeven, setStepSeven] = useState(false);
  const toggleSeven = () => setStepSeven(!stepSeven);
  const [stepEight, setStepEight] = useState(false);
  const toggleEight = () => setStepEight(!stepEight);
  const [completeForm, setCompleteForm] = useState(false);
  const toggleComplete = () => setCompleteForm(!completeForm);
  return (
    <MDBModal
      show={showConditions}
      className="BridgeTx-modal"
      setShow={setIsOpen}
    >
      <div className="vh-100 flex-row d-flex justify-content-center">
        <div className="tx-card col-lg-6">
          <div className="head">
            <h4 className="title-3">Welcome To The Project Propulsion Pad</h4>
            <br />
            <h4 className="title-2">
              You Must Accept The following Terms and Conditions To Continue
            </h4>
          </div>
          <div className="body">
            {stepOne ? (
              <div className="innerbody flex-wrap">
                <div className="innerbody flex-wrap">
                  <span className="tc-text">
                    These website terms and conditions should be read by you
                    (the "User," "Users, " "you") in its entirety prior to your
                    use of The Gas Station’s service or products. These website
                    terms and conditions of use for The Gas Station, constitute
                    a legal agreement and are entered into by and between you
                    and The Gas Station ("Company," "we," "us," "our"). The
                    following terms and conditions, together with any documents
                    and/or additional terms they expressly incorporate by
                    reference (collectively, these "Terms and Conditions"),
                    govern your access to and use, including any content,
                    functionality, and services offered on or through The Gas
                    Station (the "Website").
                  </span>
                </div>
                <div className="flex-row d-flex justify-content-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onClick={() => toggleTwo()}
                  ></input>
                  <p className="text-light">I Agree</p>
                </div>
              </div>
            ) : null}

            {stepTwo ? (
              <div className="innerbody flex-wrap">
                <div className="innerbody flex-wrap">
                  <span className="tc-text">
                    We reserve the right in our sole discretion to revise and
                    update these Terms and Conditions from time to time. Any and
                    all such modifications are effective immediately upon
                    posting and apply to all access to and continued use of the
                    Website. You agree to periodically review the Terms and
                    Conditions in order to be aware of any such modifications
                    and your continued use shall be your acceptance of these.
                    The information and material on this Website, and the
                    Website, may be changed, withdrawn, or terminated at any
                    time in our sole discretion without notice. We will not be
                    liable if, for any reason, all or any part of the Website is
                    restricted to users or unavailable at any time or for any
                    period.
                  </span>
                </div>
                <div className="flex-row d-flex justify-content-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onClick={() => toggleThree()}
                  ></input>
                  <p className="text-light">I Agree </p>
                </div>
              </div>
            ) : null}
            {stepThree ? (
              <div className="innerbody flex-wrap">
                <div className="innerbody flex-wrap">
                  <span className="tc-text">
                    The Gas Station will collect your Personal Information only
                    by lawful and fair means and not in an intrusive way to
                    operate its Service, and to provide you with the following
                    information: If you wish to subscribe to The Gas Station's
                    weekly newsletter or other marketing communications. To
                    update you on technical progress of The Gas Station. To
                    provide services to you as a User. To identify you as a User
                    for security purposes and to comply with our legal
                    obligations. To upgrade and enhance your experience within
                    the website or over the telephone, or to tailor or develop
                    information, services or products to suit your needs which
                    may include market research and conducting promotions. To
                    tell you about our products or services that we think may be
                    of interest to you by communicating with you via email, SMS
                    or telephone. To create aggregate data about Users through
                    demographic profiling, statistical analysis of the database
                    to provide to potential and existing The Gas Station
                    holders, and to allow for more efficient operation of The
                    Gas Station’s business. To comply with The Gas Station’s
                    legal and statutory obligations. For taking appropriate
                    action if The Gas Station has reason to suspect that
                    unlawful activity or misconduct of a serious nature has
                    been, is being or may be engaged in that relates to our
                    functions and activities. To establish, exercise or defend
                    any legal claims. Manage job applications. You may choose to
                    deal with us on an anonymous basis or to use a pseudonym
                    unless it is not practicable for us to deal with individuals
                    who we cannot identify or we are required by law to only
                    deal with identified individuals. Also, if you do not
                    provide The Gas Station with the Personal Information we
                    request, we may be unable to process your request to become
                    a User, provide you with our services or respond to your
                    enquiry or complaint. Examples of Personal Information that
                    may be collected by The Gas Station include your name, email
                    address, telephone numbers, your date of birth, other
                    verification information such as your Service usage
                    activities. By becoming a User or otherwise choosing to
                    provide The Gas Station with Personal Information you
                    consent to The Gas Station collecting, using and disclosing
                    your Personal Information for the above purposes.
                  </span>
                </div>
                <div className="flex-row d-flex justify-content-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onClick={() => toggleFour()}
                  ></input>
                  <p className="text-light">I Agree </p>
                </div>
              </div>
            ) : null}
            {stepFour ? (
              <div className="innerbody flex-wrap">
                <div className="innerbody flex-wrap">
                  <span className="tc-text">
                    As a condition of your access and use, you agree that you
                    may use the Website only for lawful purposes and in
                    accordance with these Terms and Conditions. You warrant and
                    agree that your use of the Website shall not: In any manner
                    violate any applicable federal, provincial, local, or
                    international law or regulation including, without
                    limitation, any laws regarding the export of data or
                    software, patent, trademark, trade secret, copyright, or
                    other intellectual property, legal rights (including the
                    rights of publicity and privacy of others) or contain any
                    material that could give rise to any civil or criminal
                    liability under applicable laws or regulations or that
                    otherwise may be in conflict with these Terms and Conditions
                    and our Privacy Policy found at OUR PRIVACY POLICY ,. In any
                    manner violate the terms of use of any third-party website
                    that is linked to the Website, including but not limited to,
                    any third-party social media website. Include or contain any
                    material that is exploitive, obscene, harmful, threatening,
                    abusive, harassing, hateful, defamatory, sexually explicit
                    or pornographic, violent, inflammatory, or discriminatory
                    based on race, sex, religion, nationality, disability,
                    sexual orientation, or age or other such legally prohibited
                    ground or be otherwise objectionable, such determination to
                    be made in Company's sole discretion. Involve stalking,
                    attempting to exploit or harm any individual (including
                    minors) in any way by exposing them to inappropriate content
                    or otherwise or ask for personal information as prohibited
                    under applicable laws, regulations, or code. Involve,
                    provide, or contribute any false, inaccurate, or misleading
                    information. Impersonate or attempt to impersonate the
                    Company, a Company employee, another user, or any other
                    person or entity (including, without limitation, by using
                    email addresses, or screen names associated with any of the
                    foregoing). Transmit, or procure the sending of, any
                    advertisements or promotions without our prior written
                    consent, sales, or encourage any other commercial
                    activities, including, without limitation, any "spam", "junk
                    mail", "chain letter", contests, sweepstakes and other sales
                    promotions, barter, or advertising or any other similar
                    solicitation. Encourage any other conduct that restricts or
                    inhibits anyone's use or enjoyment of the Website, or which,
                    as determined by us, may harm the Company or users of the
                    Website or expose them to liability. Cause annoyance,
                    inconvenience, or needless anxiety or be likely to upset,
                    embarrass, or alarm any other person. Promote any illegal
                    activity, or advocate, promote, or assist any unlawful act.
                    Give the impression that they originate from or are endorsed
                    by us or any other person or entity, if this is not the
                    case.
                  </span>
                </div>
                <div className="flex-row d-flex justify-content-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onClick={() => toggleFive()}
                  ></input>
                  <p className="text-light">I Agree </p>
                </div>
              </div>
            ) : null}
            {stepFive ? (
              <div className="innerbody flex-wrap">
                <div className="innerbody flex-wrap">
                  <span className="tc-text">
                    The Website is intended solely for the User’s personal use.
                    The User is only allowed to use the Website for personal
                    use, and may not create multiple accounts, including for the
                    purpose of collusion and/or abuse of service. The Website is
                    provided as is, and any exploitation of the Website or
                    errors in program logic and/or code (bugs) constitutes a
                    prohibited use and a material breach of these Terms and
                    Conditions. Any funds the user may misappropriate in this
                    manner pursuant to this clause shall be considered void and
                    the immediate property of the Company, without limit.
                    Persons located in or residents of the United States, North
                    Korea, Iran, Venezuela or any other jurisdiction in which it
                    is prohibited from using the Website (the "Prohibited
                    Jurisdictions") are not permitted to make use of the
                    Website. For the avoidance of doubt, the foregoing
                    restrictions on the Website from Prohibited Jurisdictions
                    applies equally to residents and citizens of other nations
                    while located in a Prohibited Jurisdiction. Any attempt to
                    circumvent the restrictions on usage by any persons located
                    in a Prohibited Jurisdiction is a breach of this Agreement.
                    An attempt at circumvention includes, but is not limited to,
                    manipulating the information used by the Company to identify
                    your location and providing the Company with false or
                    misleading information regarding your location or place of
                    residence. Any and all monies (including cryptocurrencies)
                    of a person located in a Prohibited Jurisdiction on the
                    Website are VOID, and can be confiscated or may be returned
                    to the person at the Company’s sole discretion.
                  </span>
                </div>
                <div className="flex-row d-flex justify-content-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onClick={() => toggleSix()}
                  ></input>
                  <p className="text-light">I Agree </p>
                </div>
              </div>
            ) : null}
            {stepSix ? (
              <div className="innerbody flex-wrap">
                <div className="innerbody flex-wrap">
                  <span className="tc-text">
                    For your convenience, this Website may provide links or
                    pointers to third-party sites. We make no representations
                    about any other websites that may be accessed from this
                    Website. If you choose to access any such sites, you do so
                    at your own risk. We have no control over the contents of
                    any such third-party sites and accept no responsibility for
                    such sites or for any loss or damage that may arise from
                    your use of them. You are subject to any terms and
                    conditions of such third-party sites. Such links to
                    third-party sites from the Website may include links to
                    certain social media features that enable you to link or
                    transmit on your own or using certain third-party websites,
                    certain content from this Website. You may only use these
                    features when they are provided by us and solely with
                    respect to the content identified. You may link to our
                    homepage, provided you do so in a way that is fair and legal
                    and does not damage our reputation or take advantage of it.
                    You must not establish a link in such a way as to suggest
                    any form of association, approval, or endorsement on our
                    part where none exists. Our Website must not be framed on
                    any other site, nor may you create a link to any part of our
                    Website other than the homepage. We reserve the right to
                    withdraw linking permission without notice. The website in
                    which you are linking must comply in all respects with the
                    Conditions of Use. You agree to cooperate with us in causing
                    any unauthorized framing or linking to immediately stop.
                  </span>
                </div>
                <div className="flex-row d-flex justify-content-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onClick={() => toggleSeven()}
                  ></input>
                  <p className="text-light">I Agree </p>
                </div>
              </div>
            ) : null}
            {stepSeven ? (
              <div className="innerbody flex-wrap">
                <div className="innerbody flex-wrap">
                  <span className="tc-text">
                    The Gas Station is a permissionless and fully decentralized
                    platform for token sales, lock and bulk transactions. As a
                    software development company, The Gas Station has no role in
                    enforcing KYC by default, however we do provide disclaimers
                    to users to ensure they are abiding country law and
                    complying with its KYC & AML policy.
                  </span>
                </div>
                <div className="flex-row d-flex justify-content-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onClick={() => toggleEight()}
                  ></input>
                  <p className="text-light">I Agree </p>
                </div>
              </div>
            ) : null}
            {stepEight ? (
              <div className="innerbody flex-wrap">
                <div className="innerbody flex-wrap">
                  <span className="tc-text">
                    The Website and these Terms and Conditions will be governed
                    by and construed in accordance with the laws of the British
                    Virgin Islands applicable therein, without giving effect to
                    any choice or conflict of law provision, principle, or rule
                    (whether of the laws of the British Virgin Islands or any
                    other jurisdiction) and notwithstanding your domicile,
                    residence, or physical location. Any action or proceeding
                    arising out of or relating to this Website and under these
                    Terms and Conditions will be instituted in the courts of the
                    British Virgin Islands, and each party irrevocably submits
                    to the exclusive jurisdiction of such courts in any such
                    action or proceeding. You waive any and all objections to
                    the exercise of jurisdiction over you by such courts and to
                    the venue of such courts. Nothing in this clause shall limit
                    the right of the Company to take proceedings against you in
                    any other court of competent jurisdiction, nor shall the
                    taking of proceedings in any one or more jurisdictions
                    preclude the taking of proceedings in any other
                    jurisdictions, whether concurrently or not, to the extent
                    permitted by the law of such other jurisdiction.
                    <br />
                    No failure to exercise, or delay in exercising, any right,
                    remedy, power, or privilege arising from these Terms and
                    Conditions operates, or may be construed, as a waiver
                    thereof by the Company. No single or partial exercise of any
                    right, remedy, power, or privilege hereunder precludes any
                    other or further exercise thereof or the exercise of any
                    other right, remedy, power, or privilege.
                    <br />
                    If any term or provision of these Terms and Conditions is
                    invalid, illegal, or unenforceable in any jurisdiction, such
                    invalidity, illegality, or unenforceability shall not affect
                    any other term or provision of these Terms and Conditions or
                    invalidate or render unenforceable such term or provision in
                    any other jurisdiction.
                    <br />
                    The Terms and Conditions and our Privacy Policy constitute
                    the sole and entire agreement between you and The Gas
                    Station regarding the Website and supersedes all prior and
                    contemporaneous understandings, agreements, representations
                    and warranties, both written and oral, regarding such
                    subject matter.
                  </span>
                </div>
                <div className="flex-row d-flex justify-content-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onClick={() => toggleComplete()}
                  ></input>
                  <p className="text-light">I Agree </p>
                </div>
              </div>
            ) : null}
            <div className="innerbody flex-wrap">
              {completeForm ? (
                <button
                  className="button1"
                  type="submit"
                  onClick={closeConditions}
                >
                  Accept Terms and Conditions
                </button>
              ) : null}
              <a href="/">
                <button className="button1">
                  Decline Terms and Conditions
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </MDBModal>
  );
};
export default TermsConditions;
