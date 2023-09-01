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
    const [HideOriginPath, hideOriginPathChange] = useState(false);
    const [Enableoriginshield, enableOriginShieldChange] = useState(false);
    const [OriginShieldRegion, originShieldRegionChange] = useState("");
    const [SSAIRule, ssaiRuleChange] = useState("");
    const [Coppa,coppaChange]=useState(false);
    const [style,epgStyleChange]=useState("");
    const [source_url,epgSourceURLChange]=useState("");
    const [State,stateChange]=useState("");
    const [AuthToken,authTokenChange]=useState("");
    

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in';
    
        if (AnalyticsId === "") {
            isproceed = false;
            errormessage += ' Analytics ID';
        }
        if (ChannelName === "") {
            isproceed = false;
            errormessage += ' Channel Name';
        }
        if (ContentOwner === "") {
            isproceed = false;
            errormessage += ' Content Owner';
        }
        if (ServiceID === "") {
            isproceed = false;
            errormessage += ' Service ID';
        }
        if (LaunchDate === "") {
            isproceed = false;
            errormessage += ' Launch Date';
        }
        if (Country === "") {
            isproceed = false;
            errormessage += ' Country';
        }
        if (OriginURL === "") {
            isproceed = false;
            errormessage += ' Origin URL';
        }
        if (harvestor_config === "") {
            isproceed = false;
            errormessage += ' Harvestor Config';
        }
        if (OriginShieldRegion === "") {
            isproceed = false;
            errormessage += ' Origin Shield Region';
        }
        if (SSAIRule === "") {
            isproceed = false;
            errormessage += ' SSAI Rule';
        }
        if (style === "") {
            isproceed = false;
            errormessage += ' EPG Info Style ';
        }
        if (source_url === "") {
            isproceed = false;
            errormessage += ' EPG Source URL ';
        }
        if (State === "") {
            isproceed = false;
            errormessage += ' State ';
        }
        if (AuthToken === "") {
            isproceed = false;
            errormessage += ' Auth Token';
        }
    
        if (!isproceed) {
            toast.warning(errormessage);
        }
        
        return isproceed;
    }

    const handleOriginPath=(e)=>{
        if(e === 'true'){
            hideOriginPathChange(true)
        }
        else{
            hideOriginPathChange(false)
        }
    }

    const handleEnableHarvestor=(e)=>{
        if(e === 'true'){
            enableHarvestorChange(true)
        }
        else{
            enableHarvestorChange(false)
        }
    }
    const handleOriginShield=(e)=>{
        if(e === 'true'){
            enableOriginShieldChange(true)
        }
        else{
            enableOriginShieldChange(false)
        }
    }

    const handleCoppaChange=(e)=>{
        if(e === 'true'){
            coppaChange(true)
        }
        else{
            coppaChange(false)
        }
    }

    const initialState=()=>{
        analyticsIdChange("")
        channelNameChange("")
        contentOwnerChange("")
        serviceIdChange("")
        launchDateChange("")
        countryChange("")
        originURLChange("")
        enableHarvestorChange(false)
        harvestorConfigChange("")
        hideOriginPathChange(false)
        enableOriginShieldChange(false)
        originShieldRegionChange("")
        ssaiRuleChange("")
        coppaChange(false)
        epgStyleChange("")
        epgSourceURLChange("")
        stateChange("")
        authTokenChange("")
    }
    


    const handlesubmit = (e) => {
            e.preventDefault();
            let regobj = { AnalyticsId, ChannelName, ContentOwner, ServiceID, 
                LaunchDate, Country, OriginURL, OriginInput:{enable_harvestor,harvestor_config} ,
                HideOriginPath,Enableoriginshield,OriginShieldRegion,SSAIRule,Coppa,
                EPGInfo:{style,source_url},
                State,AuthToken
            };
            if (IsValidate()) {
            console.log(regobj);
            fetch("http://107.109.131.23:8000/channelCreation", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Channel Created successfully.')
                initialState()
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }
    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Channel Creation</h1>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Analytics Id </label>
                                        <input value={AnalyticsId} onChange={e => analyticsIdChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Channel Name</label>
                                        <input value={ChannelName} onChange={e => channelNameChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Content Owner</label>
                                        <input value={ContentOwner} onChange={e => contentOwnerChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Service Id </label>
                                        <input value={ServiceID} onChange={e => serviceIdChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Launch Date <span className="errmsg"></span></label>
                                        <input value={LaunchDate} onChange={e => launchDateChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Country </label>
                                        <input value={Country} onChange={e => countryChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Origin URL</label>
                                        <textarea value={OriginURL} onChange={e => originURLChange(e.target.value)} className="form-control"></textarea>
                                    </div>
                                </div> 
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Hide Origin Path</label>
                                        <br></br>
                                        <input type="radio" checked={HideOriginPath} onChange={e => handleOriginPath(e.target.value)} name="hideOriginPath" value="true" className="app-check"></input>
                                        <label>True</label>
                                        <input type="radio" checked={!HideOriginPath} onChange={e => handleOriginPath(e.target.value)} name="hideOriginPath" value="false" className="app-check"></input>
                                        <label>False</label>
                                    </div>
                                </div>
                                <hr style={{marginTop:'20px'}}/>
                                <div>
                                    <h5>Origin Input</h5>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Enable Harvestor</label>
                                        <br></br>
                                        <input type="radio" checked={enable_harvestor} onChange={e => handleEnableHarvestor(e.target.value)} name="enableHarvestor" value="true" className="app-check"></input>
                                        <label>True</label>
                                        <input type="radio" checked={!enable_harvestor} onChange={e => handleEnableHarvestor(e.target.value)} name="enableHarvestor" value="false" className="app-check"></input>
                                        <label>False</label>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Harvestor Config</label>
                                        <input value={harvestor_config} onChange={e => harvestorConfigChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Enable Origin Shield</label>
                                        <br></br>
                                        <input type="radio" checked={Enableoriginshield} onChange={e => handleOriginShield(e.target.value)} name="enableOriginShield" value="true" className="app-check"></input>
                                        <label>True</label>
                                        <input type="radio" checked={!Enableoriginshield} onChange={e => handleOriginShield(e.target.value)} name="enableOriginShield" value="false" className="app-check"></input>
                                        <label>False</label>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Origin Shield Region</label>
                                        <input value={OriginShieldRegion} onChange={e => originShieldRegionChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <hr style={{marginTop:'20px'}}/>
                                <div>
                                    <h5>EPG Info</h5>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>EPG Style</label>
                                        <input value={style} onChange={e => epgStyleChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>EPG Source URL</label>
                                        <textarea value={source_url} onChange={e => epgSourceURLChange(e.target.value)} className="form-control"></textarea>
                                    </div>
                                </div>
                                <hr style={{marginTop:'20px'}}/>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>SSAI Rule</label>
                                        <input value={SSAIRule} onChange={e => ssaiRuleChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Coppa</label>
                                        <br></br>
                                        <input type="radio" checked={Coppa} onChange={e => handleCoppaChange(e.target.value)} name="coppa" value="true" className="app-check"></input>
                                        <label>True</label>
                                        <input type="radio" checked={!Coppa} onChange={e => handleCoppaChange(e.target.value)} name="coppa" value="false" className="app-check"></input>
                                        <label>False</label>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>State</label>
                                        <input value={State} onChange={e => stateChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Auth Token</label>
                                        <input value={AuthToken} onChange={e => authTokenChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                

                            </div>

                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default Register;