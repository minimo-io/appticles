#!/usr/bin/env dart

import 'dart:io';
import 'dart:convert';
import 'package:args/args.dart';

main(List<String> args) async {
  // var dir = Directory.current.path;
  // var p = Platform.script.path;

  final parser = ArgParser()
    ..addOption("action",
        abbr: "a",
        allowed: ["process", "merge"],
        help:
            "Provide an action to be executed on the source file with lunfardo words.")
    ..addOption("input",
        abbr: "i",
        help: "Path to the input text file containing the new lunfardo word")
    ..addOption("output",
        abbr: "o",
        help: "Output json file.",
        defaultsTo: "dicc-processed-" +
            DateTime.now().millisecondsSinceEpoch.toString() +
            ".json")
    ..addFlag("help",
        abbr: "h",
        negatable: false,
        help: "Print help instructions for processing lunfardo word files.")
    ..addOption("input1",
        help: "First input file to be merged. This needs an input2")
    ..addOption("input2", help: "Second input file to be merged with input1")
    ..addSeparator("=== LUNFARDO WORD PROCESSOR TOOL by minimo.io\n");

  final parserResults = parser.parse(args);

  if (parserResults.wasParsed("help") || !parserResults.wasParsed("action")) {
    print(parser.usage);
    exit(1);
  }

  if ("process" == parserResults["action"]) {
    if (!parserResults.wasParsed("input")) {
      print("Please provide an input file to process\n");

      print(parser.usage);
      exit(1);
    }

    print("> Trying to process new lunfardo words...");
    File(parserResults["input"]).readAsString().then((String contents) {
      String contentsWithNoLines = contents.replaceAll("\r", "");
      List<String> words = contentsWithNoLines.split("\n");
      List<Map<String, String>> distilledTerms = []; // final string of terms

      for (var word in words) {
        // var wordIndex = words.indexOf(word);
        // if its only a number then its the page number from pdf and skip
        if (isNumeric(word)) continue;
        // capitalize
        //  word = word.capitalize();

        if (word.contains(":")) {
          List termList = word.split(":"); // [0]: term [1]: description
          // add the term
          distilledTerms.add({
            't': termList[0],
            'd': termList[1].toString().trim(),
            's': termList.asMap().containsKey(2) ? termList[2] : ""
          });
        } else {
          // if the following line does not have an : then its not a new term
          // but a part of the previus one.
          // here we should add the term to the previous.
          // word in this case is just a line with the rest of the description
          // print(word);
          // get last element of the terms array
          Map<String, String> lastElement = distilledTerms.last;
          int lastElementIndex = distilledTerms.indexOf(distilledTerms.last);

          lastElement["d"] = lastElement["d"].toString() + " " + word;

          // replace for the now complete term description
          distilledTerms[lastElementIndex] = lastElement;
        }
      }
      print("> Yep, we did it! " +
          distilledTerms.length.toString() +
          " words processed.");
      saveFile(json.encode(distilledTerms), parserResults["output"]);
    });
  }

  if ("merge" == parserResults["action"]) {
    if (!parserResults.wasParsed("input1")) {
      print("Please provide a first input(1) file to merge\n");
      print(parser.usage);
      exit(1);
    }
    if (!parserResults.wasParsed("input2")) {
      print("Please provide a second input(2) file to merge\n");
      print(parser.usage);
      exit(1);
    }
    print("> Let's do it! Trying to merge...");

    String input1 = await File(parserResults["input1"]).readAsString();
    String input2 = await File(parserResults["input2"]).readAsString();

    var json1 = jsonDecode(input1);

    print(json1);

    // File(parserResults["input1"]).readAsString().then((String contents) {

    // });
  }
  // last dicc from folkloretradiciones.com.ar
}

bool isNumeric(String? s) {
  if (s == null) {
    return false;
  }
  return double.tryParse(s) != null;
}

void saveFile(String string, String output) async {
  File file = File(output);
  file.writeAsString(string);
}

extension StringExtension on String {
  String capitalize() {
    return "${this[0].toUpperCase()}${this.substring(1).toLowerCase()}";
  }
}
