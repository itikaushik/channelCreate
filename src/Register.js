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
    if (State === "") {
      isproceed = false;
      errormessage += " State ";
    }
    if (style === "") {
      isproceed = false;
      errormessage += " EPG Style ";
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
  const changeDateFormat = (date) => {
    var parts = date.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    var reversedDate = month + "/" + day + "/" + year;
    return reversedDate;
  };

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
      <div className="create-channel-div col-lg-8">
        <form className="container form-div">
          <div className="card form-div-card">
            <div className="card-body">
              <nav class="navbar bg-body-tertiary bg-primary">
                <div class="container-fluid">
                  <span class="navbar-brand mb-0 h1">
                    Channel Creation Dashboard
                  </span>
                </div>
              </nav>
              <div className="card-body-element">
                {/* <div className="col-lg-3 left-div">
                  <h2 className="page-title">Channel Creation Dashboard</h2>
                </div> */}
                <div className="col-lg-12 right-div">
                  {formPage && formPage ? (
                    <div>
                      <div className="header-div">
                        <h4 className="title">Create Channels</h4>
                        <h5 className="subtitle">
                          Fill out this form to create a channel
                        </h5>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Analytics Id</label>
                            <input
                              value={AnalyticsId}
                              onChange={(e) =>
                                analyticsIdChange(e.target.value)
                              }
                              className="form-control"
                            ></input>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Channel Name</label>
                            <span className="imp-mark">&#42;</span>
                            <input
                              value={ChannelName}
                              onChange={(e) =>
                                channelNameChange(e.target.value)
                              }
                              className="form-control"
                            ></input>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Content Owner</label>
                            <span className="imp-mark">&#42;</span>
                            <input
                              value={ContentOwner}
                              onChange={(e) =>
                                contentOwnerChange(e.target.value)
                              }
                              className="form-control"
                            ></input>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Service Id </label>
                            <span className="imp-mark">&#42;</span>
                            <input
                              value={ServiceID}
                              onChange={(e) => serviceIdChange(e.target.value)}
                              className="form-control"
                            ></input>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Launch Date</label>
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
                            <span className="imp-mark">&#42;</span>
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
                              className="form-select"
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
                              className="form-select"
                              onChange={(e) =>
                                handleEnableHarvestor(e.target.value)
                              }
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
                              onChange={(e) =>
                                harvestorConfigChange(e.target.value)
                              }
                              className="form-control"
                            ></input>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Enable Origin Shield</label>
                            <br></br>
                            <select
                              className="form-select"
                              onChange={(e) =>
                                handleOriginShield(e.target.value)
                              }
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
                            <span className="imp-mark">&#42;</span>
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
                              onChange={(e) =>
                                epgSourceURLChange(e.target.value)
                              }
                              className="form-control"
                            ></textarea>
                          </div>
                        </div>
                        <hr style={{ marginTop: "20px" }} />
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>SSAI Rule</label>
                            <span className="imp-mark">&#42;</span>
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
                              className="form-select"
                              onChange={(e) =>
                                handleCoppaChange(e.target.value)
                              }
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
                            <span className="imp-mark">&#42;</span>
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
                            <span className="imp-mark">&#42;</span>
                            <input
                              value={AuthToken}
                              onChange={(e) => authTokenChange(e.target.value)}
                              className="form-control"
                            ></input>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <button
                          type="button"
                          className="btn btn-primary submit-btn"
                          onClick={handlesubmit}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="header-div">
                        <h4 className="title">Channel Details</h4>
                        <h5 className="subtitle">
                          Previews the JSON response sent to create the channel
                        </h5>
                      </div>
                      <hr />
                      <div className="row">
                        <pre>{JSON.stringify(formData, null, 2)}</pre>
                      </div>
                      <hr />
                      <div>
                        <button
                          type="button"
                          className="btn btn-primary submit-btn"
                          onClick={handleReset}
                        >
                          Go back
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
