PennController.ResetPrefix(null); // Initiates PennController
PennController.DebugOff();
PennController.AddHost("https://amor.cms.hu-berlin.de/~petrenal/Crossconn_drawings/v4_adhoc/"); // loads pictures from external server (pre-test 3 only)

// --------------------------------------------------------------------------------------------------------------  
// Preamble

var progressBarText = ""; //Changes the text of the progress bar
const replacePreloadingMessage = ()=>{   //Changes the Preloading Message
    const preloadingMessage = $(".PennController-PennController > div");
if (preloadingMessage.length > 0 && preloadingMessage[0].innerHTML.match(/^<p>Please wait while the resources are preloading/))
    preloadingMessage.html("<p>Vă rugăm să așteptați în timp ce resursele se preîncarcă. Poate dura până la un minut.</p>");
window.requestAnimationFrame( replacePreloadingMessage );
};
window.requestAnimationFrame( replacePreloadingMessage );


//PennController.Sequence( "filler_trials", "final");
PennController.Sequence("preloadPractice","preloadFillers", "preloadCritical","demographics", "practice_trials", "instructions", shuffle(randomize("critical_trials"),randomize("filler_trials")),"end_experiment", "post_questionnaire", "send", "final");

//====================================================================================================================================================================================================================
// 0. Preloading

CheckPreloaded( "practice_trials",10000)
    .label( "preloadPractice" )
    
    .log("prolificID", "preload")
    .log("nat_lang", "preload")
    .log("other_lang", "preload")
    .log("which_other", "preload")
    .log("confused", "preload")
    
    .log("investigating", "preload")
    .log("suggestions", "preload")
    .log("age", "preload")
    .log("item_number", "preload")
    .log("item_name", "preload")
    
    .log("old_item_name", "preload")
    .log("disjunction_type", "preload")
    .log("condition", "preload")
    .log("type", "preload")
    .log("outcome", "preload")
    
    .log("sentence_intro", "preload")
    .log("sentence_guess", "preload")
    .log("sentence_outcome", "preload")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);


CheckPreloaded( "critical_trials", 20000)
    .label( "preloadCritical" )
    
    .log("prolificID", "preload")
    .log("nat_lang", "preload")
    .log("other_lang", "preload")
    .log("which_other", "preload")
    .log("confused", "preload")
    
    .log("investigating", "preload")
    .log("suggestions", "preload")
    .log("age", "preload")
    .log("item_number", "preload")
    .log("item_name", "preload")
    
    .log("old_item_name", "preload")
    .log("disjunction_type", "preload")
    .log("condition", "preload")
    .log("type", "preload")
    .log("outcome", "preload")
    
    .log("sentence_intro", "preload")
    .log("sentence_guess", "preload")
    .log("sentence_outcome", "preload")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);


CheckPreloaded( "filler_trials", 30000)
    .label( "preloadFillers" )
    
    .log("prolificID", "preload")
    .log("nat_lang", "preload")
    .log("other_lang", "preload")
    .log("which_other", "preload")
    .log("confused", "preload")
    
    .log("investigating", "preload")
    .log("suggestions", "preload")
    .log("age", "preload")
    .log("item_number", "preload")
    .log("item_name", "preload")
    
    .log("old_item_name", "preload")
    .log("disjunction_type", "preload")
    .log("condition", "preload")
    .log("type", "preload")
    .log("outcome", "preload")
    
    .log("sentence_intro", "preload")
    .log("sentence_guess", "preload")
    .log("sentence_outcome", "preload")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 1. Welcome page
PennController("demographics",
               // ENTER PROLIFIC ID
               newText("welcometext", "<p><b>Bine ați venit în experimentul nostru!</b><p>")
               .settings.css("font-size", "20px")
               ,
               newCanvas("welcomecanvas", 1000, 125)
               .settings.add("center at 50%", 0, getText("welcometext") )
               .center()
               .print()
               ,
               newTextInput("proID", "")
               .before(newText("proID", "Înainte de a începe, vă rugăm să introduceți ID-ul dumneavoastră Prolific:")
                       .settings.css("font-size", "20px"))
               .size(100, 20)
               .settings.center()
               .print()
               ,
               newText("blank","<p>")
               .print()
               ,
               newButton("cont", "Continuați")
               .settings.center()
               .print()
               .wait(getTextInput("proID")
                     .test.text(/^\w{24}$/)  // this makes sure that it's not left blank
                     .success()
                     .failure(
                         newText("IDerror","<p>Vă rugăm să introduceți ID-ul Prolific pentru a continua.")
                         .settings.color("red")
                         .settings.center()
                         .print()
                     ))
               ,  
               getCanvas("welcomecanvas")
               .remove()
               ,
               getTextInput("proID")
               .remove()
               ,
               getButton("cont")
               .remove()
               ,
               getText("IDerror")
               .remove()
               ,
               
               //====================================================================================================================================================================================================================
               // Intro/instructions
               
               newText("intro_instructions", "<p>Acest experiment investighează modul în care oamenii procesează informația lingvistică.<p>"
                       +"<p>Descrierea experimentului: Ana și Mihai sunt doi prieteni cărora le place să se joace. În acest experiment veți fi martorii unuia dintre jocurile lor. Regulile sunt următoarele: Ana are două imagini. Prima imagine reprezintă o situație și este însoțită de o propoziție care o descrie. A doua imagine reprezintă o scenă ulterioară. Ana îi arată lui Mihai prima imagine, cea care descrie situația, și îi cere să ghicească ce se va întâmpla. Mihai ghicește, dupa care Ana îi prezintă a doua imagine cu scena următoare. <b>Sarcina dumneavoastră va fi să judecați dacă Mihai a ghicit corect, apăsând pe butonul 'da' sau 'nu'</b>.<p>"
                       +"<p>Înainte de a începe experimentul, rețineți următoarele: "
                       +"<li>Vă rugăm să nu faceți pauze în timpul experimentului. Experimentul în sine ar trebui să dureze 10-20 de minute. Dacă durează mai mult de 25 de minute, nu vom putea folosi datele dvs. și nu veți fi recompensați.<br>"
                       +"<li>Vă rugăm să fiți atenți și să încercați să înțelegeți cât mai bine propozițiile și imaginile. Pe parcursul experimentului am inclus mai multe verificări ale atenției; dacă nu reușiți să le treceți, nu putem folosi datele dvs. și nu veți fi recompensați.<br>"
                       +"<li>Confidențialitatea dvs. va fi menținută prin stocarea datelor dvs. în mod anonim. Rezultatele acestui studiu de cercetare pot fi prezentate la conferințe sau în publicații. La cerere, datele pot fi puse la dispoziția altor cercetători academici non-profit care cercetează limba sau utilizarea limbii.</ul><p><p>")
               .settings.css("font-size", "17px")
               ,
               newCanvas("introcanvas",1000, 240)
               .settings.add(0,-150, getText("intro_instructions"))
               //.css( "border" , "solid 1px black" )
               .center()
               .print()   
               ,
               
               //====================================================================================================================================================================================================================
               // ENTER DEMOGRAPHICS
               
               newText("instr_demo", "În cele din urmă, vă rugăm să furnizați câteva informații de bază despre dumneavoastră.<p>")              
               .settings.css("font-size", "17px")
               ,
               newCanvas("democanvas", 1000, 30)
               .settings.add(0, 0, getText("instr_demo") )
               //.css( "border" , "solid 1px black" )
               .center()
               .print()
               ,
               //newText("instr_demo2", "<p>*Note that your confidentiality will be maintained. Prolific provides no personal information to the requester. Your data will be stored in anonymous form. The results of this research study may be presented at meetings or in publications. The data can be made accessible to other academic non-profit researchers that investigate language or language use on request.<p>")
               //.settings.css("font-size", "15px")
               // ,
               //newCanvas("democanvas2", 1000, 50)
               //.settings.add(0, -10, getText("instr_demo2") )
               //.css( "border" , "solid 1px black" )
               //.print()
               //,
               newTextInput("native_languages", "")
               .size(300, 20)
               ,
               newText("native_lang", "Ce limbă (limbi) ați crescut vorbind?<p>")
               .settings.css("font-size", "17px")
               
               .settings.bold()
               ,
               newCanvas("nativlangcanvas", 1000, 30)
               .settings.add(0, 0, getText("native_lang") )
               .settings.add(570, 0, getTextInput("native_languages") )
               //.css( "border" , "solid 1px black" )
               .center()
               .print()
               ,
               newText("other_lang", "Vorbiți în prezent și alte limbi în mod regulat?")
               .settings.css("font-size", "17px")
               .settings.bold()
               ,
               newTextInput("in_particular", "")
               .settings.hidden()
               ,
               newText("label input", "")
               .settings.after( getTextInput("in_particular") )
               ,
               newDropDown("other_languages", "")
               .settings.log()
               .settings.add(  "nu", "da, vorbesc și:")    
               .settings.after(  getText("label input") )
               .settings.callback(                                             //whenever an option is selected, do this:
                   getDropDown("other_languages")
                   .test.selected("da, vorbesc și:")                             //reveal the input box
                   .success( getTextInput("in_particular").settings.visible() )     //hide the input box
                   .failure( getTextInput("in_particular").settings.hidden()  )   
               )        
               ,
               newCanvas("languagecanvas", 1000, 35)
               .settings.add(0, 0, getText("other_lang") )
               .settings.add(570, 0, getDropDown("other_languages") )
               //.css( "border" , "solid 1px black" )
               .center()
               .print()
               ,
               //newText("<p>")
               // .print()
               // ,   
               newText("consent_button", "Prin apăsarea butonului 'Sunt de acord', sunteți de acord cu următoarele:<br>"
                       +"<ol><li> Am vârsta de 18 ani sau mai mult.<br>"
                       +"<li> Am citit informațiile de mai sus, le înțeleg și sunt de acord cu ele.<br>"
                       +"<li> Doresc să particip la experiment.</ol><p>")
               .settings.css("font-size", "17px")
               ,
               newCanvas("infocanvasthree", 1000, 105)
               .settings.add(0, 0, getText("consent_button") )
               //.css( "border" , "solid 1px black" )
               .center()
               .print()
               ,
               newButton("consent", "Sunt de acord")
               .settings.css("font-size", "15x")
               .center()        
               .print()
               .wait()  
               ,
               newText("practice_cont", "<p>Experimentul va începe cu două runde de antrenament. <p>")
               .settings.css("font-size", "17px")
               .center()       
               .print()
               ,
               newButton("start", "Începeți runda de antrenament")
               .settings.css("font-size", "15x")
               .center()
               .print()
               .wait(getTextInput("native_languages")
                     .test.text(/[^\s]+/)  // this makes sure that it's not left blank
                     .success()
                     .failure(
                         newText("IDerror1","Vă rugăm să răspundeți la întrebarea despre istoricul dvs. lingvistic.")
                         .settings.color("red")
                         .settings.center()
                         .print()
                         ,
                         getDropDown("other_languages")
                         .test.selected()
                         .success()
                         .failure(
                             newText("IDerror2","Vă rugăm să răspundeți la întrebarea despre alte limbi pe care le vorbiți în prezent.")
                             .settings.color("red")
                             .settings.center()
                             .print()
                             
                             
                         )))
               
               ,
               newVar("proID")
               .settings.global()
               .set( getTextInput("proID") )
               ,
               newVar("IDnatlang")
               .settings.global()
               .set( getTextInput("native_languages") )
               ,
               newVar("IDotherlang")
               .settings.global()
               .set( getDropDown("other_languages") )
               ,
               newVar("IDin_particular")
               .settings.global()
               .set( getTextInput("in_particular") )
               
              )                                 //end of welcome screen   
    .log("prolificID", getVar("proID"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    .log("confused", "demo")
    
    .log("investigating", "demo")
    .log("suggestions", "demo")
    .log("age", "demo")
    .log("item_number", "demo")
    .log("item_name", "demo")
    
    .log("old_item_name", "demo")
    .log("disjunction_type", "demo")
    .log("condition", "demo")
    .log("type", "demo")
    .log("outcome", "demo")
    
    .log("sentence_intro", "demo")
    .log("sentence_guess", "demo")
    .log("sentence_outcome", "demo")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 2. Practice trials
PennController.Template( PennController.GetTable( "rom_adhoc_complex_fie_fie.csv")// change this line for the appropriate experimental list
                         .filter("type" , "practice"),  
                         variable => PennController( "practice_trials",
                                                     newText("pleasewait", "...")
                                                     .settings.css("font-size", "25px")
                                                     .settings.center()
                                                     .settings.bold()
                                                     .print()
                                                     ,
                                                     newTimer("wait", 1000)
                                                     .start()
                                                     .wait()
                                                     ,
                                                     getText("pleasewait")
                                                     .remove()
                                                     ,
                                                     newImage("image_intro",variable.imgur_intro)
                                                     .settings.size(400)
                                                     ,
                                                     newImage("image_guess", variable.imgur_guess)
                                                     .settings.size(400)
                                                     .settings.hidden()
                                                     ,
                                                     newImage("image_outcome",variable.imgur_outcome)
                                                     .settings.size(400)
                                                     .settings.hidden()
                                                     ,
                                                     newText("sentence_intro","<p>"+variable.sentence_intro)
                                                     .settings.css("font-size", "20px")
                                                     ,
                                                     newText("sentence_guess", "<p>"+variable.sentence_guess)
                                                     .settings.css("font-size", "20px")
                                                     .settings.hidden()
                                                     ,
                                                     newText("sentence_outcome", "<p>"+variable.sentence_outcome1)
                                                     .settings.css("font-size", "20px")
                                                     .settings.hidden()
                                                     ,
                                                     newCanvas("canvas2",1300,10 )
                                                     .settings.add( 40, 0,newCanvas(400,10)
                                                                    .settings.add( -10,-100, getText("sentence_intro")))
                                                     .settings.add(450, 0 ,newCanvas(400,10)
                                                                   .settings.add( 0,-100, getText("sentence_guess")))
                                                     .settings.add(875, 0 ,newCanvas(400,10)
                                                                   .settings.add(0,-100, getText("sentence_outcome")))
                                                     //.css( "border" , "solid 1px black" )
                                                     .center()
                                                     .print()
                                                     ,
                                                     newCanvas("canvas",1250,350 )
                                                     .settings.add( "left at 0%", "middle at 43%", getImage("image_intro"))
                                                     .settings.add( "center at 50%", "middle at 43%", getImage("image_guess"))
                                                     .settings.add( "right at 100%", "middle at 43%", getImage("image_outcome") )
                                                     //.css( "border" , "solid 1px black" )
                                                     .center()
                                                     .print()
                                                     ,
                                                     newText("space", "<br><br><p>")
                                                     .print()
                                                     ,
                                                     newButton("next_guess", "Mai departe")
                                                     .settings.center()
                                                     .settings.css("font-size", "15px")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getText("sentence_guess")
                                                     .visible()
                                                     ,
                                                     getImage("image_guess")
                                                     .visible()
                                                     ,
                                                     getButton("next_guess")
                                                     .remove()
                                                     ,
                                                     newButton("next_outcome", "Mai departe")
                                                     .settings.center()
                                                     .settings.css("font-size", "15px")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getImage("image_outcome")
                                                     .visible()
                                                     ,
                                                     getText("sentence_outcome")
                                                     .visible()
                                                     ,
                                                     getButton("next_outcome").remove()
                                                     ,
                                                     getText("space"). remove()
                                                     ,
                                                     newText("sent_scale", "<p><b>A ghicit corect?</b><p>")
                                                     .settings.css("font-size", "20px")
                                                     .settings.center()
                                                     .print()
                                                     ,
                                                     newScale("question", "DA",   "NU")
                                                     .radio()
                                                     .labelsPosition("right")
                                                     .settings.center()
                                                     .settings.css("font-size", "20px")
                                                     .log("last")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     newText("<p>")
                                                     .print()
                                                     ,
                                                     newButton("validation", "Validați")
                                                     .settings.css("font-size", "15px")
                                                     .settings.center()
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getCanvas("canvas").remove()
                                                     ,
                                                     getCanvas("canvas2").remove()
                                                     ,
                                                     getScale("question").remove()
                                                     ,
                                                     getText("sent_scale"). remove()
                                                     ,
                                                     getButton("validation") .remove()
                                                     
                                                    )
                         .log("prolificID", getVar("proID"))
                         .log("nat_lang", getVar("IDnatlang"))
                         .log("other_lang", getVar("IDotherlang"))
                         .log("which_other", getVar("IDin_particular"))
                         .log("confused", "practice")
                         
                         .log("investigating", "practice")
                         .log("suggestions", "practice")
                         .log("age","practice")
                         .log("item_number", variable.item_number)
                         .log("item_name", variable.item_name)
                         
                         .log("old_item_name", variable.old_item_name)
                         .log("disjunction_type", variable.disjunction_type)
                         .log("condition", variable.condition)
                         .log("type", variable.type)
                         .log("outcome", variable.outcome)
                         
                         .log("sentence_intro", variable.sentence_intro)
                         .log("sentence_guess", variable.sentence_guess)
                         .log("sentence_outcome", variable.sentence_outcome2)
                         
                         .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
                         .setOption("hideProgressBar", true)
                        );

//====================================================================================================================================================================================================================
// 4. Instructions
PennController( "instructions" ,
                newText("intro_experiment",  "<p>Acum veți începe experimentul propriu-zis.<p>")
                .settings.css("font-size", "18px")
                .center()
                .print()
                ,
                newButton("start2", "Începeți experimentul")
                .settings.css("font-size", "15px")
                .settings.center()
                .print()
                .wait())
    
    .log("prolificID", getVar("proID"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    .log("confused", "instructions")
    
    .log("investigating", "instructions")
    .log("suggestions", "instructions")
    .log("age","instructions")
    .log("item_number", "instructions")
    .log("item_name", "instructions")
    
    .log("old_item_name", "instructions")
    .log("disjunction_type", "instructions")
    .log("condition", "instructions")
    .log("type", "instructions")
    .log("outcome", "instructions")
    
    .log("sentence_intro", "instructions")
    .log("sentence_guess", "instructions")
    .log("sentence_outcome", "instructions")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 4. Experimental trials
PennController.Template( PennController.GetTable( "rom_adhoc_complex_fie_fie.csv")// change this line for the appropriate experimental list
                         .filter("type" , "test_item"),  
                         variable => PennController( "critical_trials",
                                                     newText("pleasewait", "...")
                                                     .settings.css("font-size", "25px")
                                                     .settings.center()
                                                     .settings.bold()
                                                     .print()
                                                     ,
                                                     newTimer("wait", 1000)
                                                     .start()
                                                     .wait()
                                                     ,
                                                     getText("pleasewait")
                                                     .remove()
                                                     ,
                                                     newImage("image_intro",variable.imgur_intro)
                                                     .settings.size(400)
                                                     ,
                                                     newImage("image_guess", variable.imgur_guess)
                                                     .settings.size(400)
                                                     .settings.hidden()
                                                     ,
                                                     newImage("image_outcome",variable.imgur_outcome)
                                                     .settings.size(400)
                                                     .settings.hidden()
                                                     ,
                                                     newText("sentence_intro","<p>"+variable.sentence_intro)
                                                     .settings.css("font-size", "20px")
                                                     ,
                                                     newText("sentence_guess", "<p>"+variable.sentence_guess)
                                                     .settings.css("font-size", "20px")
                                                     .settings.hidden()
                                                     ,
                                                     newText("sentence_outcome", "<p>"+variable.sentence_outcome1)
                                                     .settings.css("font-size", "20px")
                                                     .settings.hidden()
                                                     ,
                                                     newCanvas("canvas2",1300,25 )
                                                     .settings.add( 40, 0,newCanvas(400,10)
                                                                    .settings.add( -10,-50, getText("sentence_intro")))
                                                     .settings.add(450, -50 ,newCanvas(400,10)
                                                                   .settings.add( 0,0, getText("sentence_guess")))
                                                     .settings.add(875, -50 ,newCanvas(400,10)
                                                                   .settings.add(0,0, getText("sentence_outcome")))
                                                     //.css( "border" , "solid 1px black" )
                                                     .center()
                                                     .print()
                                                    ,
                                                     newCanvas("canvas",1250,370 )
                                                     .settings.add( "left at 0%", "middle at 51%", getImage("image_intro"))
                                                     .settings.add( "center at 50%", "middle at 51%", getImage("image_guess"))
                                                     .settings.add( "right at 100%", "middle at 51%", getImage("image_outcome") )
                                                     //.css( "border" , "solid 1px black" )
                                                     .center()
                                                     .print()
                                                     ,
                                                     newText("space", "<br><br><p>")
                                                     .print()
                                                     ,
                                                     newButton("next_guess", "Mai departe")
                                                     .settings.center()
                                                     .settings.css("font-size", "15px")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getImage("image_guess")
                                                     .visible()
                                                     ,
                                                     getText("sentence_guess")
                                                     .visible()
                                                     ,
                                                     getButton("next_guess")
                                                     .remove()
                                                     ,
                                                     newButton("next_outcome", "Mai departe")
                                                     .settings.center()
                                                     .settings.css("font-size", "15px")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getImage("image_outcome")
                                                     .visible()
                                                     ,
                                                     getText("sentence_outcome")
                                                     .visible()
                                                     ,
                                                     getButton("next_outcome").remove()
                                                     ,
                                                     getText("space"). remove()
                                                     ,
                                                     newText("sent_scale", "<p><b>A ghicit corect?</b><p>")
                                                     .settings.css("font-size", "20px")
                                                     .settings.center()
                                                     .print()
                                                     ,
                                                     newScale("question", "DA",   "NU")
                                                     .radio()
                                                     .labelsPosition("right")
                                                     .settings.center()
                                                     .settings.css("font-size", "20px")
                                                     .log("last")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     newText("<p>")
                                                     .print()
                                                     ,
                                                     newButton("validation", "Validați")
                                                     .settings.css("font-size", "15px")
                                                     .settings.center()
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getCanvas("canvas").remove()
                                                     ,
                                                     getCanvas("canvas2").remove()
                                                     ,
                                                     getScale("question").remove()
                                                     ,
                                                     getText("sent_scale"). remove()
                                                     ,
                                                     getButton("validation") .remove()
                                                     
                                                     
                                                    )
                         .log("prolificID", getVar("proID"))
                         .log("nat_lang", getVar("IDnatlang"))
                         .log("other_lang", getVar("IDotherlang"))
                         .log("which_other", getVar("IDin_particular"))
                         .log("confused", "experimental")
                         
                         .log("investigating", "experimental")
                         .log("suggestions", "experimental")
                         .log("age","experimental")
                         .log("item_number", variable.item_number)
                         .log("item_name", variable.item_name)
                         
                         .log("old_item_name", variable.old_item_name)
                         .log("disjunction_type", variable.disjunction_type)
                         .log("condition", variable.condition)
                         .log("type", variable.type)
                         .log("outcome", variable.outcome)
                         
                         .log("sentence_intro", variable.sentence_intro)
                         .log("sentence_guess", variable.sentence_guess)
                         .log("sentence_outcome", variable.sentence_outcome2)
                        );


//====================================================================================================================================================================================================================
// 5. Filler items

PennController.Template( PennController.GetTable( "rom_adhoc_complex_fie_fie.csv")// change this line for the appropriate experimental list
                         .filter("type" , "filler_item"),  
                         variable => PennController( "filler_trials",
                                                     newText("pleasewait", "...")
                                                     .settings.css("font-size", "25px")
                                                     .settings.center()
                                                     .settings.bold()
                                                     .print()
                                                     ,
                                                     newTimer("wait", 1000)
                                                     .start()
                                                     .wait()
                                                     ,
                                                     getText("pleasewait")
                                                     .remove()
                                                     ,
                                                     newImage("image_intro",variable.imgur_intro)
                                                     .settings.size(400)
                                                     ,
                                                     newImage("image_guess", variable.imgur_guess)
                                                     .settings.size(400)
                                                     .settings.hidden()
                                                     ,
                                                     newImage("image_outcome",variable.imgur_outcome)
                                                     .settings.size(400)
                                                     .settings.hidden()
                                                     ,
                                                     newText("sentence_intro","<p>"+variable.sentence_intro)
                                                     .settings.css("font-size", "20px")
                                                     ,
                                                     newText("sentence_guess", "<p>"+variable.sentence_guess)
                                                     .settings.css("font-size", "20px")
                                                     .settings.hidden()
                                                     ,
                                                     newText("sentence_outcome", "<p>"+variable.sentence_outcome1)
                                                     .settings.css("font-size", "20px")
                                                     .settings.hidden()
                                                     ,
                                                     
                                                     newCanvas("canvas2",1300,25 )
                                                     .settings.add( 40, 0,newCanvas(400,10)
                                                                    .settings.add( -10,-50, getText("sentence_intro")))
                                                     .settings.add(450, -50 ,newCanvas(400,10)
                                                                   .settings.add( 0,0, getText("sentence_guess")))
                                                     .settings.add(875, -50 ,newCanvas(400,10)
                                                                   .settings.add(0,0, getText("sentence_outcome")))
                                                     .center()
                                                     .print()
                                                     ,
                                                     newCanvas("canvas",1250,370 )
                                                     .settings.add( "left at 0%", "middle at 51%", getImage("image_intro"))
                                                     .settings.add( "center at 50%", "middle at 51%", getImage("image_guess"))
                                                     .settings.add( "right at 100%", "middle at 51%", getImage("image_outcome") )
                                                     .center()
                                                     .print()
                                                     ,
                                                     newText("space", "<br><br><p>")
                                                     .print()
                                                     ,
                                                     newButton("next_guess", "Mai departe")
                                                     .settings.center()
                                                     .settings.css("font-size", "15px")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getImage("image_guess")
                                                     .visible()
                                                     ,
                                                     getText("sentence_guess")
                                                     .visible()
                                                     ,
                                                     getButton("next_guess")
                                                     .remove()
                                                     ,
                                                     newButton("next_outcome", "Mai departe")
                                                     .settings.center()
                                                     .settings.css("font-size", "15px")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getImage("image_outcome")
                                                     .visible()
                                                     ,
                                                     getText("sentence_outcome")
                                                     .visible()
                                                     ,
                                                     getButton("next_outcome").remove()
                                                     ,
                                                     getText("space"). remove()
                                                     ,
                                                     newText("sent_scale", "<p><b>A ghicit corect?</b><p>")
                                                     .settings.css("font-size", "20px")
                                                     .settings.center()
                                                     .print()
                                                     ,
                                                     newScale("question", "DA",   "NU")
                                                     .radio()
                                                     .labelsPosition("right")
                                                     .settings.center()
                                                     .settings.css("font-size", "20px")
                                                     .log("last")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     newText("<p>")
                                                     .print()
                                                     ,
                                                     newButton("validation", "Validați")
                                                     .settings.css("font-size", "15px")
                                                     .settings.center()
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getCanvas("canvas").remove()
                                                     ,
                                                     getCanvas("canvas2").remove()
                                                     ,
                                                     getScale("question").remove()
                                                     ,
                                                     getText("sent_scale"). remove()
                                                     ,
                                                     getButton("validation") .remove()
                                                     
                                                     
                                                    )
                         .log("prolificID", getVar("proID"))
                         .log("nat_lang", getVar("IDnatlang"))
                         .log("other_lang", getVar("IDotherlang"))
                         .log("which_other", getVar("IDin_particular"))
                         .log("confused", "fillers")
                         
                         .log("investigating", "fillers")
                         .log("suggestions", "fillers")
                         .log("age","fillers")
                         .log("item_number", variable.item_number)
                         .log("item_name", variable.item_name)
                         
                         .log("old_item_name", variable.old_item_name)
                         .log("disjunction_type", variable.disjunction_type)
                         .log("condition", variable.condition)
                         .log("type", variable.type)
                         .log("outcome", variable.outcome)
                         
                         .log("sentence_intro", variable.sentence_intro)
                         .log("sentence_guess", variable.sentence_guess)
                         .log("sentence_outcome", variable.sentence_outcome2)
                        );
//====================================================================================================================================================================================================================
// 12. End

PennController( "end_experiment",
                newText("<p><br>")
                .print()
                ,
                newButton("end_experiment" ,"Finalizați experimentul")
                .settings.center()
                .print()
                .wait()
                ,
                getButton("end_experiment")
                .remove()
               )
    .log("prolificID", getVar("proID"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    .log("confused", "end_exp")
    
    .log("investigating", "end_exp")
    .log("suggestions", "end_exp")
    .log("age","end_exp")
    .log("item_number", "end_exp")
    .log("item_name", "end_exp")
    
    .log("old_item_name", "end_exp")
    .log("disjunction_type", "end_exp")
    .log("condition", "end_exp")
    .log("type", "end_exp")
    .log("outcome", "end_exp")
    
    .log("sentence_intro", "end_exp")
    .log("sentence_guess", "end_exp")
    .log("sentence_outcome", "end_exp");

//====================================================================================================================================================================================================================
// 6. Post questionnaire

PennController( "post_questionnaire" ,
                newText("post_instructions", "<p>Așteptăm cu interes feedback-ul dumneavoastră cu privire la acest experiment!<p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("postcanvas",900, 80)
                .settings.add(-50,0, getText("post_instructions"))
                .center()
                .print()   
                ,
                newText("text_scale", "<p>Ați citit instrucțiunile și credeți că ați făcut experimentul corect?<p>")
                .settings.css("font-size", "20px")
                .settings.center()
                ,
                newScale("confused", "Da",   "Nu", "Am fost confuz")
                .radio()
                .labelsPosition("right")
                .settings.css("font-size", "20px")
                //.log("last")
                ,
                newCanvas("scalecanvas",900, 130)
                .settings.add(-50,0, getText("text_scale"))
                .settings.add(-50,70, getScale("confused"))
                .center()
                .print()
                ,
                newTextInput("exp_investigated", "")
                .size(700, 40)
                //.log()
                ,
                newText("exptext", "Ce credeți că a investigat acest experiment?")
                .settings.css("font-size", "20px")    
                ,
                newCanvas("expcanvas", 1000, 85)
                .settings.add(0, 0, getText("exptext") )
                .settings.add(0, 30, getTextInput("exp_investigated") )
                .center()
                .print()
                ,
                newTextInput("suggestions", "")
                .size(700, 40)
                //.log()
                ,
                newText("suggesttext", "Aveți vreo sugestie pentru noi? Suntem interesați de orice comentariu pe care îl aveți.")
                .settings.css("font-size", "20px")    
                ,
                newCanvas("suggestcanvas", 1000, 75)
                .settings.add(0, 10, getText("suggesttext") )
                .settings.add(0, 40, getTextInput("suggestions") )
                .center()
                .print()
                ,
                newTextInput("age", "")
                .size(120, 20)
                //.log()
                ,
                newText("agetext", "Care este vârsta dumneavoastră?")
                .settings.css("font-size", "20px")    
                ,
                newCanvas("agecanvas", 1000, 55)
                .settings.add(0, 30, getText("agetext") )
                .settings.add(285, 32, getTextInput("age") )
                .center()
                .print()
                ,
                newButton("finish", "Terminați chestionarul")
                .settings.css("font-size", "15px")
                //.center()
                .print(570, 610)
                .wait(getTextInput("age")
                      .test.text(/^[0-9]{2}$/)  // this makes sure that it's not left blank
                      .success()
                      .failure(
                          newText("IDerror","<p>Vă rugăm să vă precizați vârsta pentru a continua.")
                          .settings.color("red")
                          .settings.center()
                          .print()
                      ))
                ,
                newVar("confused")
                .settings.global()
                .set( getScale("confused") )
                ,
                newVar("investigating")
                .settings.global()
                .set( getTextInput("exp_investigated") )
                ,
                newVar("suggestions")
                .settings.global()
                .set( getTextInput("suggestions") )
                ,
                newVar("age")
                .settings.global()
                .set( getTextInput("age") )
                
               )
    
    .log("prolificID", getVar("proID"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    .log("confused", getVar("confused"))
    
    .log("investigating", getVar("investigating"))
    .log("suggestions", getVar("suggestions"))
    .log("age", getVar("age"))
    .log("item_number", "post")
    .log("item_name", "post")
    
    .log("old_item_name", "post")
    .log("disjunction_type", "post")
    .log("condition", "post")
    .log("type", "post")
    .log("outcome", "post")
    
    .log("sentence_intro", "post")
    .log("sentence_guess", "post")
    .log("sentence_outcome", "post")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);
//====================================================================================================================================================================================================================
// 7. Send results

PennController.SendResults( "send" )
    
    .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 8. Good-bye

PennController( "final",
                newText("final_text","<p><b>Vă mulțumim pentru participare!</b><p><br><p>Pentru a vă valida participarea și a primi plata, faceți clic aici: <a href='https://app.prolific.co/submissions/complete?cc=4BDC02E9' target='_blank' >Validați participarea</a><p><p>Toate datele și informațiile pe care le colectăm în cadrul acestui experiment sunt tratate în mod confidențial și sunt utilizate numai în scopuri științifice.<p> <p>Dacă aveți întrebări legate de acest studiu, vă rugăm să ne contactați la adresa: <b>cross.conn.dfg@gmail.com</b>.<p>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                newButton("void")
                .wait()
               )
    
    .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);