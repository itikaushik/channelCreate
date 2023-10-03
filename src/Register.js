import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [AnalyticsId, analyticsIdChange] = useState("");
  const [ChannelName, channelNameChange] = useState("");
  const [ContentOwner, contentOwnerChange] = useState("");
  const [ServiceID, serviceIdChange] = useState("");
  const [LaunchDate, launchDateChange] = useState("");
  const [Country, countryChange] = useState("");
  const [OriginURL, originURLChange] = useState("");
  const [enable_harvestor, enableHarvestorChange] = useState(false);
  const [harvestor_config, harvestorConfigChange] = useState("");
  const [HideOriginPath, hideOriginPathChange] = useState(true);
  const [Enableoriginshield, enableOriginShieldChange] = useState(false);
  const [OriginShieldRegion, originShieldRegionChange] = useState("");
  const [SSAIRule, ssaiRuleChange] = useState("");
  const [Coppa, coppaChange] = useState(false);
  const [style, epgStyleChange] = useState("");
  const [source_url, epgSourceURLChange] = useState("");
  const [State, stateChange] = useState("In Development");
  const [AuthToken, authTokenChange] = useState("");

  const [formPage, formPageChange] = useState(true);
  const [formData, formDataState] = useState({});

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in";

    if (ChannelName === "") {
      isproceed = false;
      errormessage += " Channel Name";
    }
    if (ContentOwner === "") {
      isproceed = false;
      errormessage += " Content Owner";
    }
    if (ServiceID === "") {
      isproceed = false;
      errormessage += " Service ID";
    }
    if (OriginURL === "") {
      isproceed = false;
      errormessage += " Origin URL";
    }
    if (SSAIRule === "") {
      isproceed = false;
      errormessage += " SSAI Rule";
    }
    if (source_url === "") {
      isproceed = false;
      errormessage += " EPG Source URL ";
    }
    if (State === "") {
      isproceed = false;
      errormessage += " State ";
    }
    if (style === "") {
      isproceed = false;
      errormessage += " State ";
    }
    if (AuthToken === "") {
      isproceed = false;
      errormessage += " Auth Token";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    }

    return isproceed;
  };

  const handleOriginPath = (e) => {
    if (e === "true") {
      hideOriginPathChange(true);
    } else {
      hideOriginPathChange(false);
    }
  };

  const handleEnableHarvestor = (e) => {
    if (e === "true") {
      enableHarvestorChange(true);
    } else {
      enableHarvestorChange(false);
    }
  };
  const handleOriginShield = (e) => {
    if (e === "true") {
      enableOriginShieldChange(true);
    } else {
      enableOriginShieldChange(false);
    }
  };

  const handleCoppaChange = (e) => {
    if (e === "true") {
      coppaChange(true);
    } else {
      coppaChange(false);
    }
  };
  const changeDateFormat=(date)=>{
    var parts = date.split('-');
    var reversedDate = parts.reverse().join('-');
    return reversedDate
  }

  const initialState = () => {
    analyticsIdChange("");
    channelNameChange("");
    contentOwnerChange("");
    serviceIdChange("");
    launchDateChange("");
    countryChange("");
    originURLChange("");
    enableHarvestorChange(false);
    harvestorConfigChange("");
    hideOriginPathChange(true);
    enableOriginShieldChange(false);
    originShieldRegionChange("");
    ssaiRuleChange("");
    coppaChange(false);
    epgStyleChange("");
    epgSourceURLChange("");
    stateChange("In Development");
    authTokenChange("");
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let regObj = {
      "Analytics ID": AnalyticsId,
      "Channel Name": ChannelName,
      "Content Owner": ContentOwner,
      "Service ID": ServiceID,
      "Launch Date": changeDateFormat(LaunchDate),
      Country: Country,
      "Origin URL": OriginURL,
      "Origin Input": {
        enable_harvestor: enable_harvestor,
        harvestor_config: harvestor_config,
      },
      "Hide Origin Path": HideOriginPath,
      "Enable origin shield": Enableoriginshield,
      "Origin Shield Region": OriginShieldRegion,
      "SSAI Rule": SSAIRule,
      Coppa: Coppa,
      "EPG Info": { style: style, source_url: source_url },
      State: State,
      "Auth Token": AuthToken,
    };
    if (IsValidate()) {
      console.log(regObj);
      formDataState(regObj);
      formPageChange(false);
      fetch("http://107.109.131.23:8000/channelCreation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          toast.success("Channel Created successfully.");
          initialState();
        })
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    formDataState({});
    formPageChange(true);
    initialState();
  };
  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container">
          <div className="card">
            <div className="card-header">
              <h1>Channel Creation</h1>
            </div>
            {formPage && formPage ? (
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Analytics Id </label>
                      <input
                        value={AnalyticsId}
                        onChange={(e) => analyticsIdChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Channel Name</label>
                      <input
                        value={ChannelName}
                        onChange={(e) => channelNameChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Content Owner</label>
                      <input
                        value={ContentOwner}
                        onChange={(e) => contentOwnerChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Service Id </label>
                      <input
                        value={ServiceID}
                        onChange={(e) => serviceIdChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Launch Date <span className="errmsg"></span>
                      </label>
                      <input
                        value={LaunchDate}
                        type="date"
                        onChange={(e) => launchDateChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Country </label>
                      <input
                        value={Country}
                        onChange={(e) => countryChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Origin URL</label>
                      <textarea
                        value={OriginURL}
                        onChange={(e) => originURLChange(e.target.value)}
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Hide Origin Path</label>
                      <br></br>
                      <select
                        className="form-control"
                        value={HideOriginPath}
                        onChange={(e) => handleOriginPath(e.target.value)}
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                  </div>
                  <hr style={{ marginTop: "20px" }} />
                  <div>
                    <h5>Origin Input</h5>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Enable Harvestor</label>
                      <br></br>
                      <select
                        className="form-control"
                        onChange={(e) => handleEnableHarvestor(e.target.value)}
                        value={enable_harvestor}
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Harvestor Config</label>
                      <input
                        value={harvestor_config}
                        onChange={(e) => harvestorConfigChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Enable Origin Shield</label>
                      <br></br>
                      <select
                        className="form-control"
                        onChange={(e) => handleOriginShield(e.target.value)}
                        value={Enableoriginshield}
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Origin Shield Region</label>
                      <input
                        value={OriginShieldRegion}
                        onChange={(e) =>
                          originShieldRegionChange(e.target.value)
                        }
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <hr style={{ marginTop: "20px" }} />
                  <div>
                    <h5>EPG Info</h5>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>EPG Style</label>
                      <input
                        value={style}
                        onChange={(e) => epgStyleChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>EPG Source URL</label>
                      <textarea
                        value={source_url}
                        onChange={(e) => epgSourceURLChange(e.target.value)}
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <hr style={{ marginTop: "20px" }} />
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>SSAI Rule</label>
                      <input
                        value={SSAIRule}
                        onChange={(e) => ssaiRuleChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Coppa</label>
                      <br></br>
                      <select
                        className="form-control"
                        onChange={(e) => handleCoppaChange(e.target.value)}
                        value={Coppa}
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>State</label>
                      <input
                        value={State}
                        disabled
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Auth Token</label>
                      <input
                        value={AuthToken}
                        onChange={(e) => authTokenChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-body">
                <div className="row">
                  {/* {JSON.stringify(formData)} */}
                  <pre>{JSON.stringify(formData, null, 2)}</pre>
                </div>
              </div>
            )}
            <div className="card-footer">
              {formPage && formPage ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlesubmit}
                >
                  Create
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleReset}
                >
                  Go back
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
